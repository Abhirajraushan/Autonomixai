const jwt = require('jsonwebtoken');
const Agent = require('../models/Agent');

exports.authenticateAgent = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) throw new Error('Authentication required');

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const agent = await Agent.findOne({ _id: decoded.id, walletAddress: decoded.walletAddress });

    if (!agent) throw new Error('Agent not found');

    req.agent = agent; // Attach agent data to request
    next();
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
