const express = require('express');
const auth = require('../../middlewares/auth');
const controller = require('./calendar.controller');

const router = express.Router();

router.get('/', auth, controller.getByDate);

module.exports = router;