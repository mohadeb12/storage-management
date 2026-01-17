const authService = require("./auth.service");

const register = async (req, res, next) => {
  try {
    const result = await authService.register(req.body);
    res.status(201).json({
      success: true,
      data: result.user,
      token: result.token,
    });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await authService.login(req.body);
    res.json({
      success: true,
      data: result.user,
      token: result.token,
    });
  } catch (err) {
    next(err);
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    const result = await authService.forgotPassword(req.body);
    res.json({
      success: true,
      message: "Verification code sent to email",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const verifyResetCode = async (req, res, next) => {
  try {
    const result = await authService.verifyResetCode(req.body);
    res.json({
      success: true,
      message: "Code verified",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const user = await authService.resetPassword(req.body);
    res.json({
      success: true,
      message: "Password reset successful",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

const changePassword = async (req, res, next) => {
  try {
    const user = await authService.changePassword(req.user.id, req.body);
    res.json({
      success: true,
      message: "Password changed successfully",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

const deleteAccount = async (req, res, next) => {
  try {
    await authService.deleteAccount(req.user.id);
    res.json({
      success: true,
      message: "Account deleted",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  register,
  login,
  forgotPassword,
  verifyResetCode,
  resetPassword,
  changePassword,
  deleteAccount,
};
