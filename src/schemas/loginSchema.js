import Joi from 'joi';

export const loginSchema = Joi.object({
  email: Joi.string().email().lowercase().required().messages({
    'string.empty': 'O email é obrigatório.',
    'string.email': 'Email inválido.',
  }),
  password: Joi.string().max(15).required().messages({
    'string.empty': 'A senha é obrigatória.',
    'string.max': 'A senha deve ter no máximo 15 caracteres.',
  }),
}).unknown(false);
