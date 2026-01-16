const Joi = require('joi');

const updateMeSchema = Joi.object({
  name: Joi.string().trim().optional(),
  avatarUrl: Joi.string().uri().optional()
}).min(1);

module.exports = {
  updateMeSchema
};