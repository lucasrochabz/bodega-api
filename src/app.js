import express from 'express';
import cors from 'cors';
import apiRouter from './routes/index.js';

export const app = express();

const allowedOrigins = [
  process.env.ORIGIN_DEV,
  process.env.ORIGIN_BUILD,
  process.env.ORIGIN_PROD,
];

const allowedHeaders = ['Content-Type', 'Authorization'];

app.use(express.json());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error('Not allowed by CORS'));
    },

    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: allowedHeaders,
  }),
);

const apiPrefix = '/api/v1';
app.use(apiPrefix, apiRouter);
