import express from 'express';
import cors from 'cors';
import apiRouter from './routes/index.js';

export const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  }),
);

const apiPrefix = '/api/v1';
app.use(apiPrefix, apiRouter);
