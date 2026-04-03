import envVars from './env.js';

export default {
  host: envVars.MYSQL_HOST,
  user: envVars.MYSQL_USER,
  password: envVars.MYSQL_PASSWORD,
  database: envVars.MYSQL_DATABASE,
  port: envVars.MYSQL_PORT,
};
