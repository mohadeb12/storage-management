const express = require('express');
const auth = require('../../middlewares/auth');
const validateRequest = require('../../middlewares/validateRequest');
const controller = require('./folder.controller');
const { createFolderSchema, updateFolderSchema } = require('./folder.validation');

const router = express.Router();

router.use(auth);

router.get('/', controller.getFolders);
router.get('/:id', controller.getFolderById);
router.post('/', validateRequest(createFolderSchema), controller.createFolder);
router.patch('/:id', validateRequest(updateFolderSchema), controller.updateFolder);
router.delete('/:id', controller.deleteFolder);

module.exports = router;