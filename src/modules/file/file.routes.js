const express = require('express');
const auth = require('../../middlewares/auth');
const validateRequest = require('../../middlewares/validateRequest');
const controller = require('./file.controller');
const { createFileSchema, updateFileSchema } = require('./file.validation');

const router = express.Router();

router.use(auth);

router.get('/', controller.getFiles);
router.get('/:id', controller.getFileById);
router.post('/', validateRequest(createFileSchema), controller.createFile);
router.patch('/:id', validateRequest(updateFileSchema), controller.updateFile);
router.delete('/:id', controller.deleteFile);

module.exports = router;