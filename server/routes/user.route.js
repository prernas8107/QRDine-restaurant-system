import express from 'express';
import verifyToken from '../middlewares/verifyToken.js';
import checkRole from '../middlewares/checkRole.js';
import User from '../models/user.js';

const router = express.Router();
const adminOnly = [verifyToken, checkRole(['admin'])];

router.get('/users', ...adminOnly, async (req, res, next) => {
  try {
    const users = await User.find().select('-passwordHash -refreshToken').sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
});

router.patch('/users/:id', ...adminOnly, async (req, res, next) => {
  try {
    const { isActive, role } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (String(user._id) === String(req.user._id) && isActive === false) {
      return res.status(400).json({ success: false, message: 'You cannot deactivate yourself' });
    }

    if (isActive !== undefined) user.isActive = isActive;
    if (role === 'admin' || role === 'customer') {
      user.role = role;
    }
    await user.save();
    const safe = user.toObject();
    delete safe.passwordHash;
    delete safe.refreshToken;
    return res.status(200).json({ success: true, data: safe });
  } catch (error) {
    next(error);
  }
});

export default router;
