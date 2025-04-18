const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

// Rota da documentação Swagger
const docsRouter = require('./routes/docsSwagger');

const authRouter = require('./routes/authRoute');
const usersRouter = require('./routes/usersRoute');
const productsRouter = require('./routes/productsRoute');
const ordersRouter = require('./routes/ordersRoute');

app.use(express.json());
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS,
  }),
);

// Documentação Swagger
app.use('/api/docs', docsRouter);

app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);
app.use('/api/orders', ordersRouter);

module.exports = app;
