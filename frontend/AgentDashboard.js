import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import AgentRegistryABI from '../abis/AgentRegistry.json';

const AgentDashboard = ({ account }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [agent, setAgent] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);

  const loadAgentData = async () => {
    try {
      setLoading(true);
      setError(null);

      const registryAddress = process.env.REACT_APP_AGENT_REGISTRY_ADDRESS;
      if (!registryAddress) throw new Error('Registry contract address not configured');

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(registryAddress, AgentRegistryABI, signer);

      const agentData = await contract.agents(account);
      if (agentData.walletAddress === ethers.ZeroAddress) {
        throw new Error('Agent not registered');
      }

      setAgent({
        name: agentData.name,
        address: agentData.walletAddress,
        reputation: agentData.reputation.toString(),
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const registerAgent = async () => {
    try {
      setIsRegistering(true);
      setError(null);

      const name = prompt("Enter your agent name (3-20 characters):");
      if (!name || name.length < 3 || name.length > 20) {
        throw new Error("Name must be 3-20 characters");
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        process.env.REACT_APP_AGENT_REGISTRY_ADDRESS,
        AgentRegistryABI,
        signer
      );

      // Estimate gas
      const gasEstimate = await contract.register.estimateGas(name);

      // Fixed gas price (20 gwei)
      const gasPrice = ethers.parseUnits('20', 'gwei');

      // Gas limit with 20% buffer (BigInt safe)
      const gasLimit = gasEstimate + (gasEstimate / 5n);

      const tx = await contract.register(name, {
        gasLimit,
        gasPrice,
      });

      setError("Transaction pending... Please wait");
      await tx.wait();
      await loadAgentData();
    } catch (err) {
      if (err.code === 4001) {
        setError("You rejected the transaction in MetaMask");
      } else if (err.message.includes("insufficient funds")) {
        setError("Insufficient ETH for gas fees");
      } else {
        setError(err.message);
      }
    } finally {
      setIsRegistering(false);
    }
  };

  useEffect(() => {
  const checkNetwork = async () => {
    if (window.ethereum) {
      try {
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        if (chainId !== '0x7a69') {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x7a69' }],
          });
        }
      } catch (err) {
        alert("Switch to Hardhat Network in MetaMask!");
        console.error("Network switch error:", err);
      }
    }
  };
  checkNetwork(); // Run only once on mount
}, []);

useEffect(() => {
  if (account) loadAgentData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [account]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Agent Dashboard</h2>
        {error?.includes('not registered') && (
          <button
            onClick={registerAgent}
            disabled={isRegistering}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              isRegistering 
                ? 'bg-gray-300 text-gray-600' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isRegistering ? 'Registering...' : 'Register Agent'}
          </button>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className={`p-4 rounded-md ${
          error.includes('not registered') 
            ? 'bg-yellow-50 border-l-4 border-yellow-400' 
            : 'bg-red-50 border-l-4 border-red-400'
        }`}>
          <p className="text-sm">
            {error.includes('not registered') ? (
              <>
                You're not registered as an agent. Register to access all features.
              </>
            ) : (
              `Error: ${error}`
            )}
          </p>
        </div>
      ) : agent ? (
        <div className="space-y-3">
          <div className="flex items-center">
            <span className="w-24 font-medium text-gray-600">Name:</span>
            <span>{agent.name}</span>
          </div>
          <div className="flex items-center">
            <span className="w-24 font-medium text-gray-600">Address:</span>
            <span className="font-mono text-sm">{agent.address}</span>
          </div>
          <div className="flex items-center">
            <span className="w-24 font-medium text-gray-600">Reputation:</span>
            <span className="flex items-center">
              {agent.reputation}
              <span className="ml-1 text-yellow-500">★</span>
            </span>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">No agent data available</p>
      )}
    </div>
  );
};

export default AgentDashboard;
