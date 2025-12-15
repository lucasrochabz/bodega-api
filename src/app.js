import express from 'express';
import cors from 'cors';
import apiRouter from './routes/index.js';

export const app = express();

const allowedOrigins = [
  process.env.ORIGIN_DEV,
  process.env.ORIGIN_BUILD,
  process.env.ORIGIN_PROD,
];

app.use(express.json());
app.use(
  cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  }),
);

const apiPrefix = '/api/v1';
app.use(apiPrefix, apiRouter);
