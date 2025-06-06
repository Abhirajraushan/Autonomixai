import React, { useState } from 'react';
import Dashboard from './components/Dashboard';

function App() {
  const [account, setAccount] = useState(null);

  // Corrected function name (was tconnectWalle)
  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ 
          method: 'eth_requestAccounts' 
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
    <div className="min-h-screen bg-gray-100 p-4">
      {!account ? (
        <button 
          onClick={connectWallet}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Connect Wallet
        </button>
      ) : (
        <Dashboard account={account} />
      )}
    </div>
  );
}

export default App;