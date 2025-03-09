// api/users.js
const app = require('../src/app');
const express = require('express');
const serverless = require('serverless-http');

const usersRouter = require('../src/routes/usersRoute');

// Cria o servidor Express para a Vercel
app.use('/users', usersRouter);

module.exports.handler = serverless(app);
