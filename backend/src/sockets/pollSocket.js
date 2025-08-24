const Poll = require('../models/Poll');

function pollSocket(io) {
  io.on('connection', (socket) => {
    console.log('✅ New client connected:', socket.id);

    socket.on('joinPoll', (pollId) => {
      socket.join(pollId);
      console.log(`📌 Client joined poll room: ${pollId}`);
    });

    socket.on('vote', async ({ pollId, optionIndex }) => {
      try {
        const poll = await Poll.findById(pollId);
        if (!poll) return;

        poll.options[optionIndex].votes += 1;
        await poll.save();

        io.to(pollId).emit('pollUpdated', poll);
        console.log(`🗳 Vote added in poll ${pollId}`);
      } catch (err) {
        console.error('❌ Vote error:', err.message);
      }
    });

    socket.on('disconnect', () => {
      console.log('❌ Client disconnected:', socket.id);
    });
  });
}

module.exports = pollSocket;
