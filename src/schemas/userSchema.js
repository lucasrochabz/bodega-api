import Joi from 'joi';

export const userSchema = Joi.object({
  firstName: Joi.string().max(100).required().messages({
    'string.empty': 'Nome não pode ser vazio.',
    'string.max': 'Nome deve ter no máximo 100 caracteres.',
    'any.required': 'Nome é obrigatório.',
  }),

  lastName: Joi.string().max(200).required().messages({
    'string.empty': 'Sobrenome não pode ser vazio.',
    'string.max': 'Sobrenome deve ter no máximo 200 caracteres.',
    'any.required': 'Sobrenome é obrigatório.',
  }),

  email: Joi.string().email().required().messages({
    'string.empty': 'Email não pode ser vazio.',
    'string.email': 'Email inválido.',
    'any.required': 'Email é obrigatório.',
  }),

  password: Joi.string().max(15).required().messages({
    'string.empty': 'Senha não pode ser vazio.',
    'string.max': 'Senha deve ter no máximo 15 caracteres.',
    'any.required': 'Senha é obrigatório.',
  }),

  zipCode: Joi.string().length(8).pattern(/^\d+$/).required().messages({
    'string.empty': 'CEP não pode ser vazio.',
    'string.length': 'CEP deve ter exatamente 8 dígitos.',
    'string.pattern.base': 'CEP deve conter apenas números.',
    'any.required': 'CEP é obrigatório.',
  }),

  street: Joi.string().max(100).required().messages({
    'string.empty': 'Logradouro não pode ser vazio.',
    'string.max': 'Logradouro deve ter no máximo 100 caracteres.',
    'any.required': 'Logradouro é obrigatório.',
  }),

  number: Joi.number().integer().positive().required().messages({
    'number.base': 'Número é inválido.',
    'any.required': 'Número é obrigatório.',
  }),

  neighborhood: Joi.string().max(50).required().messages({
    'string.empty': 'Bairro não pode ser vazio.',
    'string.max': 'Bairro deve ter no máximo 50 caracteres.',
    'any.required': 'Bairro é obrigatório.',
  }),

  city: Joi.string().max(50).required().messages({
    'string.empty': 'Cidade não pode ser vazio.',
    'string.max': 'Cidade deve ter no máximo 50 caracteres.',
    'any.required': 'Cidade é obrigatório.',
  }),

  state: Joi.string().length(2).uppercase().required().messages({
    'string.empty': 'Estado não pode ser vazio.',
    'string.length': 'Estado deve ter 2 letras.',
    'string.uppercase': 'Estado deve estar em letras maiúsculas.',
    'any.required': 'Estado é obrigatório.',
  }),
}).prefs({ stripUnknown: true });
