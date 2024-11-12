const express = require('express');
const app = express();

const productsRouter = require('./routes/products');
const usersRouter = require('./routes/users');

app.use(express.json());

app.use('/products', productsRouter);
app.use('/users', usersRouter);

module.exports = app;
