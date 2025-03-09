// api/auth.js
const app = require('../src/app');
// const express = require('express');
const serverless = require('serverless-http');

// const authRouter = require('../src/routes/authRoute');

// Cria o servidor Express para a Vercel
// app.use('/auth', authRouter);

module.exports = serverless(app);
