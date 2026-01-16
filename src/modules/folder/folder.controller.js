const folderService = require('./folder.service');

const createFolder = async (req, res, next) => {
  try {
    const folder = await folderService.createFolder(req.user.id, req.body);
    res.status(201).json({
      success: true,
      data: folder
    });
  } catch (err) {
    next(err);
  }
};

const getFolders = async (req, res, next) => {
  try {
    const folders = await folderService.getFolders(req.user.id, req.query);
    res.json({
      success: true,
      data: folders
    });
  } catch (err) {
    next(err);
  }
};

const getFolderById = async (req, res, next) => {
  try {
    const folder = await folderService.getFolderById(req.user.id, req.params.id);
    if (!folder) {
      return res.status(404).json({
        success: false,
        message: 'Folder not found'
      });
    }
    res.json({
      success: true,
      data: folder
    });
  } catch (err) {
    next(err);
  }
};

const updateFolder = async (req, res, next) => {
  try {
    const folder = await folderService.updateFolder(req.user.id, req.params.id, req.body);
    if (!folder) {
      return res.status(404).json({
        success: false,
        message: 'Folder not found'
      });
    }
    res.json({
      success: true,
      data: folder
    });
  } catch (err) {
    next(err);
  }
};

const deleteFolder = async (req, res, next) => {
  try {
    const folder = await folderService.deleteFolder(req.user.id, req.params.id);
    if (!folder) {
      return res.status(404).json({
        success: false,
        message: 'Folder not found'
      });
    }
    res.status(200).json({
      success: true,
      message: 'Folder deleted'
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createFolder,
  getFolders,
  getFolderById,
  updateFolder,
  deleteFolder
};