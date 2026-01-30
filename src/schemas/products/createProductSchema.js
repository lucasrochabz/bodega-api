import Joi from 'joi';

export const createProductSchema = Joi.object({
  name: Joi.string().min(3).max(200).required(),

  price: Joi.number().precision(2).positive().required(),

  description: Joi.string().required(),

  stock: Joi.number().integer().min(0).required(),

  status: Joi.string().valid('ativo', 'inativo').required(),

  imagePath: Joi.string().max(200).required(),
}).prefs({ stripUnknown: true });
