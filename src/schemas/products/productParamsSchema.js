import Joi from 'joi';

export const productParamsSchema = Joi.object({
  slug: Joi.string().required().messages({
    'string.base': 'Slug do produto deve ser um texto.',
    'string.empty': 'Slug do produto inválido.',
    'any.required': 'Slug do produto é obrigatório',
  }),
});
