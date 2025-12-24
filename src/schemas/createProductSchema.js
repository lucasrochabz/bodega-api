import Joi from 'joi';

export const createProductSchema = Joi.object({
  name: Joi.string().min(3).required(),
  price: Joi.number().positive().required(),
  description: Joi.string().allow(null, ''),
  stock: Joi.number().integer().min(0).required(),
  status: Joi.boolean().default(true),
  imagePath: Joi.string().uri().optional(),
}).prefs({ stripUnknown: true });
