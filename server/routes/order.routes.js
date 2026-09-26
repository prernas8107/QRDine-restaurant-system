import express from 'express';
import { createOrder, getOrders, updateOrderStatus } from '../controllers/order.controller.js';
import checkGuestOrUser from '../middlewares/checkGuestAndUser.js';
import verifyToken from '../middlewares/verifyToken.js';
import checkRole from '../middlewares/checkRole.js';

const router = express.Router();

router.get('/orders', checkGuestOrUser, getOrders);
router.post('/orders', checkGuestOrUser, createOrder);
router.patch('/orders/:id', verifyToken, checkRole(['admin']), updateOrderStatus);

export default router;
