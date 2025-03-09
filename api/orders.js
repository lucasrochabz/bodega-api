// api/orders.js
const app = require('../src/app');
const express = require('express');
const serverless = require('serverless-http');

const ordersRouter = require('../src/routes/ordersRoute');

// Cria o servidor Express para a Vercel
app.use('/orders', ordersRouter);

module.exports.handler = serverless(app);
