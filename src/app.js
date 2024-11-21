const express = require('express');
const cors = require('cors');
const app = express();

const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const ordersRouter = require('./routes/orders');
const cartsRouter = require('./routes/carts');

app.use(express.json());
app.use(cors());

app.use('/products', productsRouter);
app.use('/users', usersRouter);
app.use('/orders', ordersRouter);
app.use('/carts', cartsRouter);

module.exports = app;
