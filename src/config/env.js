import path from 'node:path';
import dotenv from 'dotenv';
import Joi from 'joi';

const env = process.env.NODE_ENV || 'development';

const envFileMap = {
  development: '.env',
  docker: '.env.docker',
  test: '.env.test',
  production: '.env.production',
};

const envPath = path.resolve(process.cwd(), envFileMap[env]);

dotenv.config({ path: envPath });
console.info(`[INFO][ENV] Variáveis carregadas de: ${envPath}`);

const schema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'docker', 'production', 'test')
    .default('development'),

  PORT: Joi.number().default(4000),

  MYSQL_HOST: Joi.string().required(),
  MYSQL_USER: Joi.string().required(),
  MYSQL_PASSWORD: Joi.string().required(),
  MYSQL_DATABASE: Joi.string().required(),
  MYSQL_PORT: Joi.number().default(3306),
}).unknown();

const { error, value } = schema.validate(process.env);

if (error) {
  throw new Error(`Erro de validação de ambiente: ${error.message}`);
}

const envVars = value;

export default envVars;
