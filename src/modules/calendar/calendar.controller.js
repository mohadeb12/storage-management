const calendarService = require('./calendar.service');

const getByDate = async (req, res, next) => {
  try {
    const { date } = req.query;
    if (!date) {
      return res.status(400).json({
        success: false,
        message: 'date query is required'
      });
    }
    const files = await calendarService.getFilesByDate(req.user.id, date);
    res.json({
      success: true,
      data: files
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getByDate
};