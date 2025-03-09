// api/products.js
const app = require('../src/app');
// const express = require('express');
const serverless = require('serverless-http');

// const productsRouter = require('../src/routes/productsRoute');

// Cria o servidor Express para a Vercel
// app.use('/products', productsRouter);

module.exports.handler = serverless(app);
