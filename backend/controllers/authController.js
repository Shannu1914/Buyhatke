import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const makeToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

const sendAuthCookie = (res, token) => {
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.COOKIE_SECURE === 'true',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000
  });
};

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: 'Email already registered' });
  const user = await User.create({ name, email, password }); // role defaults to "user"
  const token = makeToken(user._id);
  sendAuthCookie(res, token);
  res.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role } });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password)))
    return res.status(400).json({ message: 'Invalid credentials' });
  const token = makeToken(user._id);
  sendAuthCookie(res, token);
  res.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role } });
};

export const me = async (req, res) => {
  res.json({ user: req.user });
};

export const logout = async (_req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out' });
};
