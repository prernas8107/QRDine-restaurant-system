import express from 'express';
import { getAllCoupans, registerCoupan } from '../controllers/coupan.controller.js';
import verifyToken from '../middlewares/verifyToken.js';
import checkRole from '../middlewares/checkRole.js';

const router = express.Router() ;


router.get('/coupans', verifyToken, getAllCoupans);
router.post('/coupans', verifyToken, checkRole(['admin']), registerCoupan);

export default router ;