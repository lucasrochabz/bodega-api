import express from 'express';
import { corsMiddleware } from './middlewares/corsMiddleware.js';
import webhooksRoutes from './routes/webhooksRoute.js';
import apiRoutes from './routes/index.js';

export const app = express();

app.use(express.json());

const apiPrefix = '/api/v1';

// Webhooks — sem CORS
app.use(`${apiPrefix}/webhooks`, webhooksRoutes);

// API pública — com CORS
app.use(apiPrefix, corsMiddleware, apiRoutes);

// fix: add errorHandler depois que entender o uso.
