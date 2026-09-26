import express from 'express';
import {
  createMenu,
  getAllMenuItems,
  getAdminMenuItems,
  updateMenu,
  deleteMenu,
  syncDefaultMenu,
} from '../controllers/menu.controlller.js';
import verifyToken from '../middlewares/verifyToken.js';
import checkRole from '../middlewares/checkRole.js';
import upload from '../middlewares/upload.js';

const router = express.Router();
const adminOnly = [verifyToken, checkRole(['admin'])];

router.get('/menu/sync-defaults', syncDefaultMenu);
router.get('/menu', getAllMenuItems);
router.get('/admin/menu', ...adminOnly, getAdminMenuItems);
router.post('/menu', ...adminOnly, upload.single('image'), createMenu);
router.patch('/menu/:id', ...adminOnly, upload.single('image'), updateMenu);
router.delete('/menu/:id', ...adminOnly, deleteMenu);

export default router;
