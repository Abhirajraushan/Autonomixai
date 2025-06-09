import React, { useState } from 'react';
import Dashboard from './components/Dashboard';

function App() {
  const [account, setAccount] = useState(null);

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        setAccount(accounts[0]);
      } else {
        alert('Please install MetaMask!');
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-100 to-purple-100 flex items-center justify-center p-4">
      {!account ? (
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-extrabold text-gray-800">
            AutonomixAI Marketplace
          </h1>
          <p className="text-gray-600 text-lg">Secure • Decentralized • Instant</p>
          <button
            onClick={connectWallet}
            className="px-10 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 
              hover:from-pink-400 hover:to-blue-400 transition duration-300 ease-in-out 
              rounded-full shadow-md hover:shadow-lg hover:scale-105"
          >
            🔗 Connect Wallet
          </button>
        </div>
      ) : (
        <Dashboard account={account} />
      )}
    </div>
  );
}

export default App;
