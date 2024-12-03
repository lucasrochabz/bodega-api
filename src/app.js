const express = require('express');
const cors = require('cors');
const app = express();

const authsRouter = require('./routes/authsRoute');
const usersRouter = require('./routes/usersRoute');
const productsRouter = require('./routes/productsRoute');
const ordersRouter = require('./routes/ordersRoute');
const cartsRouter = require('./routes/cartsRoute');

app.use(express.json());
app.use(cors());

app.use('/auth', authsRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/orders', ordersRouter);
app.use('/carts', cartsRouter);

module.exports = app;
