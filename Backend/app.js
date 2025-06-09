const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

console.log('Loaded MONGODB_URI:', process.env.MONGODB_URI);
console.log('REGISTRY_ADDRESS:', process.env.REGISTRY_ADDRESS);
console.log('BLOCKCHAIN_RPC:', process.env.BLOCKCHAIN_RPC);
console.log('PORT:', process.env.PORT);
console.log('JWT_SECRET:', process.env.JWT_SECRET);

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const agentRoutes = require('./routes/agentRoutes');

const app = express();  // Initialize app first

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// MongoDB connection URL (using local MongoDB here)
const url = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/autonomixaiDb";

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

// Use agent routes
app.use('/api/agents', agentRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5005;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
