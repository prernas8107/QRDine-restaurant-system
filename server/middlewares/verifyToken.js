import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.',
      });
    }

    const token = authHeader.startsWith('Bearer ')
      ? authHeader.split(' ')[1]
      : authHeader;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. Malformed token.',
      });
    }

    const secret =
      process.env.JWT_SECRET ||
      '5ee5ccd49bc212e3ce9f4b67b63ab981433cccfbe60f7dbf92b22b87116d3ea73ccf4fb6afbf0e73f90772f7a838156006d5d1faec38da9314a20484a639cd6c';

    let decoded;
    try {
      decoded = jwt.verify(token, secret);
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
          success: false,
          error: 'access token expired',
          message: 'Access token has expired',
        });
      }
      return res.status(401).json({
        success: false,
        message: 'Invalid access token',
      });
    }

    const userData = await User.findById(decoded.id).select('-passwordHash');
    if (!userData) {
      return res.status(404).json({
        success: false,
        message: 'User associated with token not found',
      });
    }

    req.user = userData;
    next();
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export default verifyToken;

//step1 => session token ui bhjna hain headers  , session verify expiry time => !expired => next() => you are session is expired