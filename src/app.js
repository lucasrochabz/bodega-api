const express = require('express');
const cors = require('cors');
const app = express();

const authRouter = require('./routes/authRoute');
const usersRouter = require('./routes/usersRoute');
const productsRouter = require('./routes/productsRoute');
const ordersRouter = require('./routes/ordersRoute');

// Rota da documentação Swagger
const docsRouter = require('./routes/docsSwagger');

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);
app.use('/api/orders', ordersRouter);

// Documentação Swagger
app.use('/api/docs', docsRouter);

module.exports = app;
