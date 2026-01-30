import path from 'node:path';
import dotenv from 'dotenv';

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
