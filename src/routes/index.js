const express = require('express');
const authRoutes = require('../modules/auth/auth.routes');
const userRoutes = require('../modules/user/user.routes');
const folderRoutes = require('../modules/folder/folder.routes');
const fileRoutes = require('../modules/file/file.routes');
const calendarRoutes = require('../modules/calendar/calendar.routes');
const staticRoutes = require('../modules/static/static.routes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/folders', folderRoutes);
router.use('/files', fileRoutes);
router.use('/calendar', calendarRoutes);
router.use('/static', staticRoutes);

module.exports = router;