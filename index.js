require('dotenv').config();
const serverless = require('serverless-http');
const app = require('./src/app');

module.exports = serverless(app);

// const API_PORT = process.env.API_PORT || 3000;

// app.listen(API_PORT, () => {
//   console.log(`Executando servidor na porta ${API_PORT}`);
// });
