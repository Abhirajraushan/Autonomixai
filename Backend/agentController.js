// REMOVE: require('../config');  // env already loaded in app.js

const Agent = require('../models/Agent');
const { createNewWallet } = require('../../blockchain/scripts/walletUtils');
const { ethers } = require('ethers');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

console.log('REGISTRY_ADDRESS inside controller:', process.env.REGISTRY_ADDRESS);

exports.registerAgent = async (req, res) => {
  try {
    const { name, password } = req.body;

    const { address, privateKey } = createNewWallet();

    const newAgent = new Agent({ name, walletAddress: address, privateKey, password });
    await newAgent.save();

    const provider = new ethers.providers.JsonRpcProvider(process.env.BLOCKCHAIN_RPC);
    const wallet = new ethers.Wallet(privateKey, provider);

    const abiPath = path.resolve(__dirname, '../../blockchain/artifacts/contracts/AgentRegistry.sol/AgentRegistry.json');
    const registryAbi = JSON.parse(fs.readFileSync(abiPath)).abi;

    const registry = new ethers.Contract(process.env.REGISTRY_ADDRESS, registryAbi, wallet);
    await registry.register(name);

    const token = jwt.sign(
      { id: newAgent._id, walletAddress: newAgent.walletAddress },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(201).json({
      success: true,
      agent: { name, walletAddress: address },
      token,
    });
  } catch (error) {
    console.error('Error in registerAgent:', error);
    res.status(500).json({ error: error.message });
  }
};
