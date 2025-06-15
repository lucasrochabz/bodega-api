import './env/index.js';
import { app } from './app.js';

const API_PORT = process.env.API_PORT || 3000;

app.listen(API_PORT, () => {
  console.log(
    `[API] Executando servidor na porta http://localhost:${API_PORT}`,
  );
});
