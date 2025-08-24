const Poll = require('../models/Poll');
const pollService = require('../services/pollService');

exports.createPoll = async (req, res, next) => {
  try {
    const { question, options } = req.body;
    const poll = await pollService.createPoll(req.user.id, question, options);
    res.status(201).json(poll);
  } catch (err) {
    next(err);
  }
};

exports.votePoll = async (req, res, next) => {
  try {
    const { pollId, optionId } = req.body;
    const updatedPoll = await pollService.votePoll(req.user.id, pollId, optionId);
    res.status(200).json(updatedPoll);
  } catch (err) {
    next(err);
  }
};

exports.getPolls = async (req, res, next) => {
  try {
    const polls = await pollService.getAllPolls();
    res.status(200).json(polls);
  } catch (err) {
    next(err);
  }
};
