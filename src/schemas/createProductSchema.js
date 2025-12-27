import Joi from 'joi';

export const createProductSchema = Joi.object({
  name: Joi.string().min(3).max(200).required().messages({}),

  price: Joi.number().precision(2).positive().required().messages({}),

  description: Joi.string().required().messages({}),

  stock: Joi.number().integer().min(0).required().messages({}),

  status: Joi.string().valid('ativo', 'inativo').messages({}),

  imagePath: Joi.string().max(200).optional().messages({}),
}).prefs({ stripUnknown: true });
