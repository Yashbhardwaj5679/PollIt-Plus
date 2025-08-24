// A simple analytics service example
const Poll = require('../models/Poll');

async function getPollAnalytics(pollId) {
    const poll = await Poll.findById(pollId);
    if (!poll) throw new Error('Poll not found');

    const totalVotes = poll.options.reduce((sum, option) => sum + option.votes, 0);
    return {
        pollId: poll._id,
        question: poll.question,
        totalVotes,
        options: poll.options.map(opt => ({
            text: opt.text,
            votes: opt.votes,
            percentage: totalVotes > 0 ? (opt.votes / totalVotes) * 100 : 0
        }))
    };
}

module.exports = {
    getPollAnalytics
};
