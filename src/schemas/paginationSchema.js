import Joi from 'joi';

export const paginationSchema = Joi.object({
  page: Joi.number().integer().min(1).default(2).messages({
    'number.base': 'Página é inválida.',
  }),
  pageSize: Joi.number().min(1).max(10).default(10).messages({
    'number.base': 'Tamanho da página é inválido.',
  }),
});
