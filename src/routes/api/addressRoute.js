import express from 'express';
import { addressController } from '../../controllers/address.controller.js';

const router = express.Router();

router.get('/:postalCode', addressController.getAddress);

export default router;
