const File = require('../file/file.model');

const getFilesByDate = async (ownerId, dateString) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    const error = new Error('Invalid date');
    error.statusCode = 400;
    throw error;
  }
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);
  const end = new Date(date);
  end.setHours(23, 59, 59, 999);

  const files = await File.find({
    owner: ownerId,
    createdAt: { $gte: start, $lte: end }
  }).sort({ createdAt: -1 });

  return files;
};

module.exports = {
  getFilesByDate
};