import Joi from 'joi';

export const tokenSchema = Joi.object({
  token: Joi.string().required().messages({
    'string.empty': 'O token é obrigatório.',
  }),
});
