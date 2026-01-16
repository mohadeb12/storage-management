const express = require('express');
const validateRequest = require('../../middlewares/validateRequest');
const authMiddleware = require('../../middlewares/auth');
const controller = require('./auth.controller');
const {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  verifyResetCodeSchema,
  resetPasswordSchema,
  changePasswordSchema
} = require('./auth.validation');

const router = express.Router();

router.post('/register', validateRequest(registerSchema), controller.register);
router.post('/login', validateRequest(loginSchema), controller.login);
router.post('/forgot-password', validateRequest(forgotPasswordSchema), controller.forgotPassword);
router.post('/verify-reset-code', validateRequest(verifyResetCodeSchema), controller.verifyResetCode);
router.post('/reset-password', validateRequest(resetPasswordSchema), controller.resetPassword);
router.post('/change-password', authMiddleware, validateRequest(changePasswordSchema), controller.changePassword);
router.delete('/delete-account', authMiddleware, controller.deleteAccount);

module.exports = router;