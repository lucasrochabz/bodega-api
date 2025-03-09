// api/auth.js
const serverless = require('serverless-http');
const app = require('../src/app'); // Importando o app Express configurado

// Exportando a função serverless para o Vercel
module.exports.handler = serverless(app);
