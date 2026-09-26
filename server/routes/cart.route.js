import express from 'express';
import {
  getCart,
  addToCart,
  removeItemCart,
  increaseItem,
  decreaseItem,
  clearCart,
} from '../controllers/cart.controller.js';

const router = express.Router();

router.get('/cart/:userId', getCart);
router.post('/addtocart', addToCart);

// NEW ROUTES
router.delete('/remove/:userId/:menuItemId', removeItemCart);
router.patch('/increase/:userId/:menuItemId', increaseItem);
router.patch('/decrease/:userId/:menuItemId', decreaseItem);
router.delete('/clear/:userId', clearCart);

export default router;