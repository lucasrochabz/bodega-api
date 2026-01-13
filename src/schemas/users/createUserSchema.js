import Joi from 'joi';

// fix: add mensagens
export const createUserSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().required(),
  zipCode: Joi.string().required(),
  street: Joi.string().required(),
  number: Joi.string().required(),
  neighborhood: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
}).prefs({ stripUnknown: true });
