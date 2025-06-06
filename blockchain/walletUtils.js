// blockchain/walletUtils.js
const { Wallet } = require('ethers');

function createNewWallet() {
  const wallet = Wallet.createRandom();
  return {
    address: wallet.address,
    privateKey: wallet.privateKey
  };
}

module.exports = { createNewWallet };
