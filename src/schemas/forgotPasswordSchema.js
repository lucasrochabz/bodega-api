import Joi from 'joi';

export const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.empty': 'O email é obrigatório.',
    'string.email': 'Email inválido.',
  }),
});
