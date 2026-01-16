const User = require('./user.model');

const getMe = async userId => {
  const user = await User.findById(userId).select('-password -resetCode -resetCodeExpiresAt');
  return user;
};

const updateMe = async (userId, data) => {
  const allowed = {};
  if (data.name !== undefined) {
    allowed.name = data.name;
  }
  if (data.avatarUrl !== undefined) {
    allowed.avatarUrl = data.avatarUrl;
  }
  const user = await User.findByIdAndUpdate(userId, allowed, {
    new: true,
    runValidators: true
  }).select('-password -resetCode -resetCodeExpiresAt');
  return user;
};

module.exports = {
  getMe,
  updateMe
};