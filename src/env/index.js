import path from 'node:path';
import dotenv from 'dotenv';

dotenv.config();

const env = process.env.NODE_ENV;
console.log('env:', env);

const envFileMap = {
  development: '.env',
  docker: '.env.docker',
  test: '.env.test',
  production: '.env.production',
};

const envPath = path.resolve(process.cwd(), envFileMap[env]);

dotenv.config({ path: envPath });
console.log(`[ENV] Variáveis carregadas de: ${envPath}`);
