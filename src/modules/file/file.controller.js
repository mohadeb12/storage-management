const fileService = require('./file.service');

const createFile = async (req, res, next) => {
  try {
    const file = await fileService.createFile(req.user.id, req.body);
    res.status(201).json({
      success: true,
      data: file
    });
  } catch (err) {
    next(err);
  }
};

const getFiles = async (req, res, next) => {
  try {
    const files = await fileService.getFiles(req.user.id, req.query);
    res.json({
      success: true,
      data: files
    });
  } catch (err) {
    next(err);
  }
};

const getFileById = async (req, res, next) => {
  try {
    const file = await fileService.getFileById(req.user.id, req.params.id);
    if (!file) {
      return res.status(404).json({
        success: false,
        message: 'File not found'
      });
    }
    res.json({
      success: true,
      data: file
    });
  } catch (err) {
    next(err);
  }
};

const updateFile = async (req, res, next) => {
  try {
    const file = await fileService.updateFile(req.user.id, req.params.id, req.body);
    if (!file) {
      return res.status(404).json({
        success: false,
        message: 'File not found'
      });
    }
    res.json({
      success: true,
      data: file
    });
  } catch (err) {
    next(err);
  }
};

const deleteFile = async (req, res, next) => {
  try {
    const file = await fileService.deleteFile(req.user.id, req.params.id);
    if (!file) {
      return res.status(404).json({
        success: false,
        message: 'File not found'
      });
    }
    res.status(200).json({
      success: true,
      message: 'File deleted'
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createFile,
  getFiles,
  getFileById,
  updateFile,
  deleteFile
};