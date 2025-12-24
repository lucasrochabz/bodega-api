import Joi from 'joi';

export const updateUserSchema = Joi.object({
  firstName: Joi.string().max(100).messages({
    'string.empty': 'Nome não pode ser vazio.',
    'string.max': 'Nome deve ter no máximo 100 caracteres.',
  }),
  lastName: Joi.string().max(200).messages({
    'string.empty': 'Sobrenome não pode ser vazio.',
    'string.max': 'Sobrenome deve ter no máximo 200 caracteres.',
  }),
  email: Joi.string().email().messages({
    'string.empty': 'Email não pode ser vazio.',
    'string.email': 'Email inválido.',
  }),
  zipCode: Joi.string().length(8).pattern(/^\d+$/).messages({
    'string.empty': 'CEP não pode ser vazio.',
    'string.length': 'CEP deve ter exatamente 8 dígitos.',
    'string.pattern.base': 'CEP deve conter apenas números.',
  }),
  street: Joi.string().max(100).messages({
    'string.empty': 'Logradouro não pode ser vazio.',
    'string.max': 'Logradouro deve ter no máximo 100 caracteres.',
  }),
  number: Joi.number().integer().positive().messages({
    'number.base': 'Número é inválido.',
  }),
  neighborhood: Joi.string().max(50).messages({
    'string.empty': 'Bairro não pode ser vazio.',
    'string.max': 'Bairro deve ter no máximo 50 caracteres.',
  }),
  city: Joi.string().max(50).messages({
    'string.empty': 'Cidade não pode ser vazio.',
    'string.max': 'Cidade deve ter no máximo 50 caracteres.',
  }),
  state: Joi.string().length(2).uppercase().messages({
    'string.empty': 'Estado não pode ser vazio.',
    'string.length': 'Estado deve ter 2 letras.',
    'string.uppercase': 'Estado deve estar em letras maiúsculas.',
  }),
}).min(1);
