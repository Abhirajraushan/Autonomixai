const Agent = require('../models/Agent');
const { createNewWallet } = require('../../blockchain/walletUtils');

exports.registerAgent = async (req, res) => {
  try {
    const { name } = req.body;
    const { address, privateKey } = createNewWallet();

    const newAgent = new Agent({
      name,
      walletAddress: address
    });

    await newAgent.save();

    res.status(201).json({
      message: 'Agent registered successfully',
      agent: {
        id: newAgent._id,
        name: newAgent.name,
        walletAddress: newAgent.walletAddress
      },
      privateKey // For dev only, remove in production
    });
  } catch (error) {
    console.error('Agent Registration Failed:', error);
    res.status(500).json({ error: 'Agent registration failed' });
  }
};
