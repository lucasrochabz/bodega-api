import Joi from 'joi';

export const resetPasswordSchema = Joi.object({
  newPassword: Joi.string().max(15).required().messages({
    'string.empty': 'Senha não pode ser vazio.',
    'string.max': 'Senha deve ter no máximo 15 caracteres.',
    'any.required': 'Senha é obrigatório.',
  }),
});
