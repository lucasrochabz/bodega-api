import express from 'express';
import { corsMiddleware } from './middlewares/corsMiddleware.js';
import webhooksRouter from './routes/webhooksRoute.js';
import apiRouter from './routes/index.js';

export const app = express();

app.use(express.json());

const apiPrefix = '/api/v1';

// Webhooks — sem CORS
app.use(`${apiPrefix}/webhooks`, webhooksRouter);

// API pública — com CORS
app.use(apiPrefix, corsMiddleware, apiRouter);
