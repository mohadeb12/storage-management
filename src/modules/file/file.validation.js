const Joi = require('joi');

const objectIdPattern = /^[0-9a-fA-F]{24}$/;

const createFileSchema = Joi.object({
  title: Joi.string().trim().required(),
  type: Joi.string().valid('note', 'image', 'pdf', 'other').required(),
  content: Joi.string().allow('', null),
  fileUrl: Joi.string().uri().allow('', null),
  folder: Joi.string().pattern(objectIdPattern).allow(null),
  isFavorite: Joi.boolean().optional()
});

const updateFileSchema = Joi.object({
  title: Joi.string().trim().optional(),
  type: Joi.string().valid('note', 'image', 'pdf', 'other').optional(),
  content: Joi.string().allow('', null).optional(),
  fileUrl: Joi.string().uri().allow('', null).optional(),
  folder: Joi.string().pattern(objectIdPattern).allow(null).optional(),
  isFavorite: Joi.boolean().optional()
}).min(1);

module.exports = {
  createFileSchema,
  updateFileSchema
};