import './env/index.js';
import { app } from './app.js';

const API_PORT = process.env.API_PORT || 3000;

app.listen(API_PORT, () => {
  console.info(
    `[DOC] Referência da API disponível em http://localhost:${API_PORT}/api/v1/docs`,
  );
  console.info(
    `[API] Executando servidor na porta http://localhost:${API_PORT}`,
  );
});
