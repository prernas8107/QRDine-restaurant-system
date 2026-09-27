import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt.js';

export const register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'Name, email, and password are required',
      });
    }

    // check if user is already registered
    const userData = await User.findOne({ email });
    if (userData) {
      return res.status(400).json({
        message: 'You are already registered. Please login.',
      });
    }

    // hash the password
    const passwordHash = await bcrypt.hash(password, 12);
    const data = { name, email, phone, passwordHash, role: 'customer' };
    const newUser = await User.create(data);

    const userObj = newUser.toObject();
    delete userObj.passwordHash;

    return res.status(201).json({
      message: 'Your account has been successfully created',
      data: userObj,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password are required',
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: `There is no account with ${email}. Please register.`,
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        message: 'This account has been deactivated. Contact QRDine admin.',
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: 'Password does not match. Please try again.',
      });
    }

    const accessToken = generateAccessToken({
      name: user.name,
      email: user.email,
      role: user.role,
      id: user._id,
    });
    const refreshToken = generateRefreshToken({
      name: user.name,
      email: user.email,
      role: user.role,
      id: user._id,
    });

    user.refreshToken = refreshToken;
    user.refreshTokenExpiresTime = new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000
    );
    user.lastlogin = new Date();
    await user.save();

    const userObj = user.toObject();
    delete userObj.passwordHash;

    return res.status(200).json({
      data: userObj,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const searchAccount = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }
    const user = await User.findOne({ email }).select('-passwordHash');
    if (!user) {
      return res.status(404).json({ message: 'No account found' });
    }
    return res.status(200).json({
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const refresh = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        message: 'Refresh token is required',
      });
    }

    const secret =
      process.env.JWT_SECRET ||
      '5ee5ccd49bc212e3ce9f4b67b63ab981433cccfbe60f7dbf92b22b87116d3ea73ccf4fb6afbf0e73f90772f7a838156006d5d1faec38da9314a20484a639cd6c';

    let decoded;
    try {
      decoded = jwt.verify(refreshToken, secret);
    } catch (error) {
      return res.status(401).json({
        success: false,
        error:
          error.name === 'TokenExpiredError'
            ? 'Refresh token expired'
            : 'Invalid refresh token',
      });
    }

    if (!decoded || !decoded.id) {
      return res.status(401).json({
        success: false,
        message: 'Invalid refresh token payload',
      });
    }

    const user = await User.findById(decoded.id);
    if (!user || !user.refreshToken) {
      return res.status(401).json({
        success: false,
        message: 'No active refresh session found',
      });
    }

    if (user.refreshToken !== refreshToken) {
      return res.status(401).json({
        success: false,
        message: 'Refresh token does not match active session',
      });
    }

    if (user.refreshTokenExpiresTime && user.refreshTokenExpiresTime < new Date()) {
      return res.status(401).json({
        success: false,
        message: 'Refresh token expired',
      });
    }

    const accessToken = generateAccessToken({
      name: user.name,
      email: user.email,
      role: user.role,
      id: user._id,
    });

    return res.json({
      success: true,
      accessToken,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};