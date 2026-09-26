import express from 'express';
import {
  createTable,
  getAllTables,
  getTableBySlug,
  getPublicTables,
  regenerateTableQr,
  updateTable,
  deleteTable,
} from '../controllers/table.controller.js';
import verifyToken from '../middlewares/verifyToken.js';
import checkRole from '../middlewares/checkRole.js';

const router = express.Router();
const adminOnly = [verifyToken, checkRole(['admin'])];

router.get('/tables/public', getPublicTables);
router.get('/tables/qr/:slug', getTableBySlug);
router.get('/tables/:slug', getTableBySlug);
router.get('/tables', getAllTables);
router.post('/tables', ...adminOnly, createTable);
router.post('/tables/:id/regenerate-qr', ...adminOnly, regenerateTableQr);
router.patch('/tables/:id', ...adminOnly, updateTable);
router.delete('/tables/:id', ...adminOnly, deleteTable);

export default router;
