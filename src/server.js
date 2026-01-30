import './config/env.js';
import { app } from './app.js';

const API_PORT = process.env.API_PORT || 3000;

app.listen(API_PORT, () => {
  console.info(
    `[INFO][DOC] Referência da API disponível em http://localhost:${API_PORT}/api/v1/docs`,
  );
  console.info(
    // fix: deixar assim: Servidor executando na porta 4000
    `[INFO][SERVER] Executando servidor na porta http://localhost:${API_PORT}`,
  );
});
