import Session from '../models/session.js';

const SessionTokenVerify = async (req, res, next) => {
  try {
    const sessionToken =
      req.body.sessionToken ||
      req.headers['x-session-token'] ||
      req.query.sessionToken;

    if (!sessionToken) {
      return res.status(401).json({
        success: false,
        message: 'Session token is required',
      });
    }

    const session = await Session.findOne({ sessionToken });
    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Invalid session token',
      });
    }

    const currentTime = new Date();
    if (session.expiresAt && session.expiresAt < currentTime) {
      return res.status(401).json({
        success: false,
        message: 'Session token has expired',
      });
    }

    req.session = session;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default SessionTokenVerify;
//continue as guest => session token  => window 2 din => register convert => local => verify => convert