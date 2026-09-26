import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const checkGuestOrUser = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const authHeader = req.headers.authorization;
      const token = authHeader.startsWith('Bearer ')
        ? authHeader.split(' ')[1]
        : authHeader;

      if (token) {
        const secret =
          process.env.JWT_SECRET ||
          '5ee5ccd49bc212e3ce9f4b67b63ab981433cccfbe60f7dbf92b22b87116d3ea73ccf4fb6afbf0e73f90772f7a838156006d5d1faec38da9314a20484a639cd6c';
        try {
          const decoded = jwt.verify(token, secret);
          if (decoded && decoded.id) {
            const userData = await User.findById(decoded.id).select(
              '-passwordHash'
            );
            req.user = userData;
          }
        } catch {
          // Token is invalid/expired - proceed as guest
          req.user = null;
        }
      }
    }
    next();
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export default checkGuestOrUser;
//wo guest or login customer =>  upr wale middleware ka

// /orders => optional auth => controller   //loyalpoints


// choice => login =< loyalpoint 
// guest -> order => menu
//guest => main => register 
