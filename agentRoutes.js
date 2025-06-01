const express = require('express');
const router = express.Router();
const { registerAgent } = require('../controllers/agentController');

router.post('/create', registerAgent); // '/create' maps to /api/agents/create

module.exports = router;
