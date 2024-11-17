require('dotenv').config();
const app = require('./src/app');

const API_PORT = process.env.API_PORT || 3000;

app.listen(API_PORT, () => {
  console.log(`Servidor rodando na porta ${API_PORT}`);
});
