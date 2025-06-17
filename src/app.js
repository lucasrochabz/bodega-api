import express from 'express';
import cors from 'cors';

// Importação das Rotas
import docsRouter from './routes/docsSwagger.js';

// Rota da Aplicação
import authRouter from './routes/authRoute.js';
import usersRouter from './routes/usersRoute.js';
import productsRouter from './routes/productsRoute.js';
import ordersRouter from './routes/ordersRoute.js';

export const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  }),
);

// Rotas
app.use('/api/docs', docsRouter);

app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);
app.use('/api/orders', ordersRouter);
