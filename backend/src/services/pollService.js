const Poll = require('../models/Poll');

async function createPoll(question, options, createdBy) {
    const poll = new Poll({
        question,
        options: options.map(opt => ({ text: opt, votes: 0 })),
        createdBy
    });
    return await poll.save();
}

async function getAllPolls() {
    return await Poll.find().sort({ createdAt: -1 });
}

async function getPollById(id) {
    return await Poll.findById(id);
}

async function votePoll(pollId, optionIndex) {
    const poll = await Poll.findById(pollId);
    if (!poll) throw new Error('Poll not found');
    if (!poll.options[optionIndex]) throw new Error('Invalid option index');

    poll.options[optionIndex].votes += 1;
    return await poll.save();
}

module.exports = {
    createPoll,
    getAllPolls,
    getPollById,
    votePoll
};
