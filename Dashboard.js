import React, { useEffect, useState } from 'react';
import AgentDashboard from './AgentDashboard';
import TaskMarket from './TaskMarket';
import { ethers } from 'ethers';

export default function Dashboard({ account }) {
  const [loading, setLoading] = useState(true);
  const [networkError, setNetworkError] = useState(null);

  useEffect(() => {
    const checkNetwork = async () => {
      try {
        if (window.ethereum) {
          const chainId = await window.ethereum.request({ method: 'eth_chainId' });
          if (chainId !== '0x7a69') { // Hardhat chainId
            setNetworkError('Please connect to Hardhat network (ChainID: 31337)');
          }
        }
        setLoading(false);
      } catch (error) {
        console.error("Network check error:", error);
        setLoading(false);
      }
    };

    checkNetwork();
  }, [account]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (networkError) {
    return (
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md max-w-4xl mx-auto mt-8">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              {networkError}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="space-y-8">
        <header className="pb-4 border-b border-gray-200">
          <h1 className="text-3xl font-bold text-gray-900">Agent Platform</h1>
          <p className="mt-1 text-sm text-gray-500">
            {account ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}` : 'Not connected'}
          </p>
        </header>
        
        <AgentDashboard account={account} />
        <TaskMarket account={account} />
      </div>
    </div>
  );
}