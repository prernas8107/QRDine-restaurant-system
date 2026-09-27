import express from 'express';
import { createRazorpayOrder, verifyRazorpayPayment } from '../controllers/payment.controller.js';

const router = express.Router();

router.post('/payment/create-order', createRazorpayOrder);
router.post('/payment/verify', verifyRazorpayPayment);

export default router;
