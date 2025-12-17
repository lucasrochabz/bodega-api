import cors from 'cors';

const allowedOrigins = [
  process.env.ORIGIN_DEV,
  process.env.ORIGIN_BUILD,
  process.env.ORIGIN_PROD,
];

const allowedHeaders = ['Content-Type', 'Authorization'];

export const corsMiddleware = cors({
  origin: (origin, callback) => {
    // Requisições sem origin (Insomnia, curl, backend)
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
});
