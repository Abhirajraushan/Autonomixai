require('dotenv').config();
console.log('Loaded MONGODB_URI:', process.env.MONGODB_URI);  

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

// // app.js
// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const agentRoutes = require('./routes/agentRoutes');

// dotenv.config();
// const app = express();

// app.use(express.json());
// app.use('/api/agents', agentRoutes);

// const PORT = process.env.PORT || 5000;

// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => {
//   console.log('✅ MongoDB connected');
//   app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
// }).catch((err) => {
//   console.error('❌ MongoDB connection error:', err);
// });
