import Joi from 'joi';

// fix: add as outras variaveis de ambiente
export const envSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'docker', 'production', 'test')
    .default('development'),

  API_PORT: Joi.number().default(4000),

  MYSQL_HOST: Joi.string().required(),
  MYSQL_USER: Joi.string().required(),
  MYSQL_PASSWORD: Joi.string().required(),
  MYSQL_DATABASE: Joi.string().required(),
  MYSQL_PORT: Joi.number().default(3306),
}).unknown();
