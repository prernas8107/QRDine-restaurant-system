import express from 'express';
import { getAllCoupans, registerCoupan } from '../controllers/coupan.controller.js';
import verifyToken from '../middlewares/verifyToken.js';
import checkRole from '../middlewares/checkRole.js';
import checkGuestOrUser from '../middlewares/checkGuestAndUser.js';

const router = express.Router();

// Support both /coupon, /coupons, /coupan, /coupans
const couponPaths = ['/coupan', '/coupans', '/coupon', '/coupons'];

couponPaths.forEach((path) => {
  router.get(path, checkGuestOrUser, getAllCoupans);
  router.post(path, verifyToken, checkRole(['admin']), registerCoupan);
});

export default router;