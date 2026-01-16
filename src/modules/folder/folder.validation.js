const Joi = require('joi');

const objectIdPattern = /^[0-9a-fA-F]{24}$/;

const createFolderSchema = Joi.object({
  name: Joi.string().trim().required(),
  parentFolder: Joi.string().pattern(objectIdPattern).allow(null),
  color: Joi.string().trim().optional(),
  icon: Joi.string().trim().optional(),
  isFavorite: Joi.boolean().optional()
});

const updateFolderSchema = Joi.object({
  name: Joi.string().trim().optional(),
  parentFolder: Joi.string().pattern(objectIdPattern).allow(null).optional(),
  color: Joi.string().trim().optional(),
  icon: Joi.string().trim().optional(),
  isFavorite: Joi.boolean().optional()
}).min(1);

module.exports = {
  createFolderSchema,
  updateFolderSchema
};