import Joi from 'joi';

export const productParamsSchema = Joi.object({
  productId: Joi.number().integer().required().messages({
    'number.base': 'ID do produto inválido.',
    'any.required': 'ID do produto é obrigatório',
  }),
});
