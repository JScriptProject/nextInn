import { userSignUp } from '../controllers/authControllers/userSignUp.controller.js';
import { userLogin } from '../controllers/authControllers/userLogin.controller.js';
import { isAuthenticated } from '../midlewares/isAuthenticated.js';
import { verifySession } from '../controllers/authControllers/verifySession.controller.js';

import { refreshSession } from '../controllers/authControllers/refreshSession.controller.js';
import express from 'express';

const router = express.Router();

router.post('/signup', userSignUp);
router.post('/login', userLogin);
router.post('/me',isAuthenticated, verifySession)
router.post('/refresh', refreshSession);

export default router;