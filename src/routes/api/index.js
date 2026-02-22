import express from 'express';
// importacao das Rotas
import docsRoutes from './docsSwagger.js';

import authRoutes from './authRoute.js';
import usersRoutes from './usersRoute.js';
import productsRoutes from './productsRoute.js';
import ordersRoutes from './ordersRoute.js';
import paymentsRoutes from './paymentsRoute.js';

const router = express.Router();

// Rotas
router.use('/docs', docsRoutes);

router.use('/auth', authRoutes);
router.use('/users', usersRoutes);
router.use('/products', productsRoutes);
router.use('/orders', ordersRoutes);
router.use('/payments', paymentsRoutes);

export default router;
