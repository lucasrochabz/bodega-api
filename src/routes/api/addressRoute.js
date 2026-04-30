import express from 'express';
import { addressController } from '#src/controllers/address.controller.js';

const router = express.Router();

router.get('/:postalCode', addressController.getAddress);

export default router;
