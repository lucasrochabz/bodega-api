import dotenv from 'dotenv';
import app from './app.js';

dotenv.config();

const API_PORT = process.env.API_PORT || 3000;

app.listen(API_PORT, () => {
  console.log(`Executando servidor na porta http://localhost:${API_PORT}`);
});
