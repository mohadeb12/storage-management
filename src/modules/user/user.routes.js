const express = require('express');
const auth = require('../../middlewares/auth');
const validateRequest = require('../../middlewares/validateRequest');
const controller = require('./user.controller');
const { updateMeSchema } = require('./user.validation');

const router = express.Router();

router.get('/me', auth, controller.getMe);
router.patch('/me', auth, validateRequest(updateMeSchema), controller.updateMe);

module.exports = router;