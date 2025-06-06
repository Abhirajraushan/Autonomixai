// backend/models/Task.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  description: { type: String, required: true },
  reward: { type: Number, required: true },
  creatorAgent: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent' },
  assignedAgent: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent' },
  status: { type: String, enum: ['open', 'assigned', 'completed', 'paid'], default: 'open' },
  bids: [{
    agent: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent' },
    amount: Number,
    timestamp: Date
  }]
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);