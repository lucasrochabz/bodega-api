import Joi from 'joi';

export const paymentSchema = Joi.object({
  event: Joi.string().required(),

  order_id: Joi.string().required(),

  transaction_id: Joi.string().required(),
});
