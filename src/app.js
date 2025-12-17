import express from 'express';
import { corsMiddleware } from './middlewares/corsMiddleware.js';
import apiRouter from './routes/index.js';

export const app = express();

app.use(express.json());
app.use(corsMiddleware);

const apiPrefix = '/api/v1';
app.use(apiPrefix, apiRouter);
