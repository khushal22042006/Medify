const User = require('../models/User');

const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role)
      return res.status(400).json({ message: 'All fields are required.' });
    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: 'Email already registered.' });
    const user = await User.create({ name, email, password, role });
    req.session.userId = user._id;
    req.session.role   = user.role;
    res.status(201).json({ message: 'Registered successfully.', role: user.role });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error.' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role)
      return res.status(400).json({ message: 'All fields are required.' });
    const user = await User.findOne({ email, role });
    if (!user)
      return res.status(401).json({ message: 'Invalid email, role, or password.' });
    const isMatch = await user.matchPassword(password);
    if (!isMatch)
      return res.status(401).json({ message: 'Invalid email, role, or password.' });
    req.session.userId    = user._id;
    req.session.role      = user.role;
    req.session.userEmail = user.email;
    res.json({ message: 'Login successful.', role: user.role });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error.' });
  }
};

const logout = (req, res) => {
  req.session.destroy(() => res.json({ message: 'Logged out.' }));
};

// ✅ NEW - added me function
const me = async (req, res) => {
  if (!req.session.userId)
    return res.status(401).json({ message: 'Not logged in.' });
  try {
    const user = await User.findById(req.session.userId).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
};

// ✅ me is now included
module.exports = { register, login, logout, me };