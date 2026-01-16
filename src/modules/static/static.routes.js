const express = require('express');
const controller = require('./static.controller');

const router = express.Router();

router.get('/terms', controller.getTerms);
router.get('/privacy', controller.getPrivacy);
router.get('/about', controller.getAbout);
router.get('/support', controller.getSupport);

module.exports = router;