import express from 'express';
// importacao das Rotas
import docsRouter from './docsSwagger.js';
import authRouter from './authRoute.js';
import usersRouter from './usersRoute.js';
import productsRouter from './productsRoute.js';
import ordersRouter from './ordersRoute.js';

const router = express.Router();

// Rotas
router.use('/docs', docsRouter);

router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/products', productsRouter);
router.use('/orders', ordersRouter);

export default router;
