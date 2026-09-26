import express from 'express';
import {
  Login,
  refresh,
  register,
  searchAccount,
} from '../controllers/auth.controller.js';
import SessionTokenVerify from '../middlewares/SessionTokenVerify.js';
import verifyToken from '../middlewares/verifyToken.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', Login);
router.post('/search-account', searchAccount);
router.post('/refresh', refresh);

router.post('/convert', SessionTokenVerify, async (req, res) => {
  try {
    const session = req.session;
    session.convertedSession = true;
    if (req.body.userId) {
      session.userId = req.body.userId;
    }
    await session.save();

    return res.status(200).json({
      success: true,
      message: 'Session converted successfully',
      data: session,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;


//auth.controller  + auth.route => app.js


//pending task karlo 
// kal properly coupan api intergate 


// NOTE XLOCAL TOKEN => access token , refresh token , session token => migration => cookie infeature 
//NOTE UI => accesstoken ,refresh token , mail , cloudinary , role based access , rbac  , guest work , session token  ,cookie , cors 




