import Joi from 'joi';

// fix: add as outras variaveis de ambiente
export const envSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'docker', 'production', 'test')
    .default('development'),

  API_PORT: Joi.number().default(4000),

  MYSQLHOST: Joi.string().required(),
  MYSQLUSER: Joi.string().required(),
  MYSQLPASSWORD: Joi.string().required(),
  MYSQLDATABASE: Joi.string().required(),
  MYSQLPORT: Joi.number().default(3306),
}).unknown();
