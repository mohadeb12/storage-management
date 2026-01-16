const bcrypt = require('bcryptjs');
const User = require('../user/user.model');
const generateToken = require('../../utils/generateToken');

const sanitizeUser = user => {
  const obj = user.toObject();
  delete obj.password;
  delete obj.resetCode;
  delete obj.resetCodeExpiresAt;
  return obj;
};

const register = async data => {
  const existing = await User.findOne({ email: data.email.toLowerCase() });
  if (existing) {
    const error = new Error('Email already in use');
    error.statusCode = 400;
    throw error;
  }
  const user = await User.create({
    name: data.name,
    email: data.email.toLowerCase(),
    password: data.password
  });
  const token = generateToken(user._id);
  return {
    user: sanitizeUser(user),
    token
  };
};

const login = async data => {
  const user = await User.findOne({ email: data.email.toLowerCase() });
  if (!user) {
    const error = new Error('Invalid credentials');
    error.statusCode = 401;
    throw error;
  }
  const isMatch = await bcrypt.compare(data.password, user.password);
  if (!isMatch) {
    const error = new Error('Invalid credentials');
    error.statusCode = 401;
    throw error;
  }
  const token = generateToken(user._id);
  return {
    user: sanitizeUser(user),
    token
  };
};

const forgotPassword = async data => {
  const user = await User.findOne({ email: data.email.toLowerCase() });
  if (!user) {
    const error = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expires = new Date(Date.now() + 15 * 60 * 1000);
  user.resetCode = code;
  user.resetCodeExpiresAt = expires;
  await user.save();
  return {
    email: user.email,
    code
  };
};

const verifyResetCode = async data => {
  const user = await User.findOne({ email: data.email.toLowerCase() });
  if (!user || !user.resetCode || !user.resetCodeExpiresAt) {
    const error = new Error('Invalid reset request');
    error.statusCode = 400;
    throw error;
  }
  if (user.resetCode !== data.code) {
    const error = new Error('Invalid code');
    error.statusCode = 400;
    throw error;
  }
  if (user.resetCodeExpiresAt < new Date()) {
    const error = new Error('Code expired');
    error.statusCode = 400;
    throw error;
  }
  return { email: user.email };
};

const resetPassword = async data => {
  const user = await User.findOne({ email: data.email.toLowerCase() });
  if (!user || !user.resetCode || !user.resetCodeExpiresAt) {
    const error = new Error('Invalid reset request');
    error.statusCode = 400;
    throw error;
  }
  if (user.resetCode !== data.code) {
    const error = new Error('Invalid code');
    error.statusCode = 400;
    throw error;
  }
  if (user.resetCodeExpiresAt < new Date()) {
    const error = new Error('Code expired');
    error.statusCode = 400;
    throw error;
  }
  user.password = data.newPassword;
  user.resetCode = undefined;
  user.resetCodeExpiresAt = undefined;
  await user.save();
  return sanitizeUser(user);
};

const changePassword = async (userId, data) => {
  const user = await User.findById(userId);
  if (!user) {
    const error = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }
  const isMatch = await bcrypt.compare(data.oldPassword, user.password);
  if (!isMatch) {
    const error = new Error('Old password is incorrect');
    error.statusCode = 400;
    throw error;
  }
  user.password = data.newPassword;
  await user.save();
  return sanitizeUser(user);
};

const deleteAccount = async userId => {
  const user = await User.findByIdAndDelete(userId);
  if (!user) {
    const error = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }
  return true;
};

module.exports = {
  register,
  login,
  forgotPassword,
  verifyResetCode,
  resetPassword,
  changePassword,
  deleteAccount
};