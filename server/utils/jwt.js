import jwt from 'jsonwebtoken';

const getSecret = () =>
  process.env.JWT_SECRET ||
  '5ee5ccd49bc212e3ce9f4b67b63ab981433cccfbe60f7dbf92b22b87116d3ea73ccf4fb6afbf0e73f90772f7a838156006d5d1faec38da9314a20484a639cd6c';

export const generateAccessToken = (payload) => {
  return jwt.sign(payload, getSecret(), { expiresIn: process.env.JWT_EXPIRES_IN || '1h' });
};

export const generateRefreshToken = (payload) => {
  return jwt.sign(payload, getSecret(), { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d' });
};