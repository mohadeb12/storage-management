const Folder = require('./folder.model');
const File = require('../file/file.model');

const createFolder = async (ownerId, data) => {
  const folder = await Folder.create({
    name: data.name,
    owner: ownerId,
    parentFolder: data.parentFolder || null,
    color: data.color,
    icon: data.icon,
    isFavorite: data.isFavorite
  });
  return folder;
};

const getFolders = async (ownerId, query) => {
  const filter = { owner: ownerId };
  if (query.parentFolder === 'null') {
    filter.parentFolder = null;
  } else if (query.parentFolder) {
    filter.parentFolder = query.parentFolder;
  }
  if (query.search) {
    filter.name = { $regex: query.search, $options: 'i' };
  }
  const folders = await Folder.find(filter).sort({ createdAt: -1 });
  return folders;
};

const getFolderById = async (ownerId, id) => {
  const folder = await Folder.findOne({ _id: id, owner: ownerId });
  return folder;
};

const updateFolder = async (ownerId, id, data) => {
  const folder = await Folder.findOneAndUpdate(
    { _id: id, owner: ownerId },
    data,
    { new: true, runValidators: true }
  );
  return folder;
};

const deleteFolder = async (ownerId, id) => {
  await File.deleteMany({ owner: ownerId, folder: id });
  const folder = await Folder.findOneAndDelete({ _id: id, owner: ownerId });
  return folder;
};

module.exports = {
  createFolder,
  getFolders,
  getFolderById,
  updateFolder,
  deleteFolder
};