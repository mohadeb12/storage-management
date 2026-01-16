const File = require('./file.model');

const createFile = async (ownerId, data) => {
  const file = await File.create({
    title: data.title,
    type: data.type,
    content: data.content,
    fileUrl: data.fileUrl,
    owner: ownerId,
    folder: data.folder || null,
    isFavorite: data.isFavorite
  });
  return file;
};

const getFiles = async (ownerId, query) => {
  const filter = { owner: ownerId };
  if (query.folder === 'null') {
    filter.folder = null;
  } else if (query.folder) {
    filter.folder = query.folder;
  }
  if (query.type) {
    filter.type = query.type;
  }
  if (query.isFavorite === 'true') {
    filter.isFavorite = true;
  }
  if (query.search) {
    filter.title = { $regex: query.search, $options: 'i' };
  }
  const files = await File.find(filter).sort({ createdAt: -1 });
  return files;
};

const getFileById = async (ownerId, id) => {
  const file = await File.findOne({ _id: id, owner: ownerId });
  return file;
};

const updateFile = async (ownerId, id, data) => {
  const file = await File.findOneAndUpdate(
    { _id: id, owner: ownerId },
    data,
    { new: true, runValidators: true }
  );
  return file;
};

const deleteFile = async (ownerId, id) => {
  const file = await File.findOneAndDelete({ _id: id, owner: ownerId });
  return file;
};

module.exports = {
  createFile,
  getFiles,
  getFileById,
  updateFile,
  deleteFile
};