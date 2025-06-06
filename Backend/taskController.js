const Task = require('../models/Task');
const { ethers } = require('ethers');

exports.createTask = async (req, res) => {
  try {
    const { description, reward } = req.body;
    const provider = new ethers.providers.JsonRpcProvider(process.env.BLOCKCHAIN_RPC);

    // Use req.agent.privateKey here
    const wallet = new ethers.Wallet(req.agent.privateKey, provider);

    const marketplaceAbi = require('../../blockchain/artifacts/contracts/TaskMarketplace.sol/TaskMarketplace.json').abi;
    const marketplace = new ethers.Contract(process.env.MARKETPLACE_ADDRESS, marketplaceAbi, wallet);

    const tx = await marketplace.createTask(description, reward);
    await tx.wait();

    res.status(201).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};