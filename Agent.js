// backend/models/Agent.js
const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  walletAddress: { type: String, required: true, unique: true },
  status: { type: String, default: 'active' },
}, { timestamps: true });

module.exports = mongoose.model('Agent', agentSchema);
