import Joi from 'joi';

export const orderSchema = Joi.object({
  status: Joi.string()
    .valid(
      'rascunho',
      'aguardando pagamento',
      'pagamento efetuado',
      'concluido',
    )
    .required()
    .messages({
      'string.empty': 'O status do pedido é obrigatório.',
      'any.only': 'Status do pedido inválido.',
      'any.required': 'O status do pedido é obrigatório.',
    }),
});
