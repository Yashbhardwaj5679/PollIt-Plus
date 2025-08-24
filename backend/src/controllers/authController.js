const User = require('../models/User');
const jwtUtil = require('../utils/jwt');

exports.register = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const user = new User({ username, password });
    await user.save();

    const token = jwtUtil.generateToken({ id: user._id });
    res.status(201).json({ token, user: { id: user._id, username: user.username } });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwtUtil.generateToken({ id: user._id });
    res.status(200).json({ token, user: { id: user._id, username: user.username } });
  } catch (err) {
    next(err);
  }
};
