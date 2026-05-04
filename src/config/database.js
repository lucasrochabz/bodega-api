import envVars from './env/index.js';

export default {
  host: envVars.MYSQLHOST,
  user: envVars.MYSQLUSER,
  password: envVars.MYSQLPASSWORD,
  database: envVars.MYSQLDATABASE,
  port: envVars.MYSQLPORT,
};
