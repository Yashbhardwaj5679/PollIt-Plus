// routes/pollRoutes.js
const express = require('express');
const router = express.Router();
const pollController = require('../controllers/pollController');
const authMiddleware = require('../middleware/authMiddleware');

// Poll routes
router.post('/', authMiddleware, pollController.createPoll);   // Create poll
router.get('/', pollController.getAllPolls);                  // Get all polls
router.get('/:id', pollController.getPollById);               // Get poll by ID
router.post('/:id/vote', authMiddleware, pollController.votePoll); // Vote on a poll

module.exports = router;

