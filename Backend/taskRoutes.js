// backend/routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { authenticateAgent } = require('../middleware/auth'); // Add this middleware

// Create new task (connected to blockchain)
router.post('/', authenticateAgent, taskController.createTask);

// Get all tasks (from MongoDB with blockchain sync)
router.get('/', taskController.getAllTasks);

// Get single task details
router.get('/:taskId', taskController.getTaskDetails);

// Complete task (updates blockchain + MongoDB)
router.patch('/:taskId/complete', authenticateAgent, taskController.completeTask);

module.exports = router;