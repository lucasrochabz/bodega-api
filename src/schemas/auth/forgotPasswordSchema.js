import Joi from 'joi';

export const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().lowercase().required().messages({
    'string.empty': 'O email é obrigatório.',
    'string.email': 'Email inválido.',
  }),

  origin: Joi.string().uri().required().messages({
    'string.empty': 'A origem é obrigatório.',
    'string.email': 'Origem inválido.',
  }),
});
