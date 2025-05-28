import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Rota da documentação Swagger
import docsRouter from './routes/docsSwagger.js';

// Rota da Aplicação
import authRouter from './routes/authRoute.js';
import usersRouter from './routes/usersRoute.js';
import productsRouter from './routes/productsRoute.js';
import ordersRouter from './routes/ordersRoute.js';

const app = express();
dotenv.config();

app.use(express.json());
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  }),
);

// Documentação Swagger
app.use('/api/docs', docsRouter);

app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);
app.use('/api/orders', ordersRouter);

export default app;
