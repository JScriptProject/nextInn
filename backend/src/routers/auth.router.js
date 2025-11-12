import { userSignUp } from '../controllers/authControllers/userSignUp.controller.js';
import { userLogin } from '../controllers/authControllers/userLogin.controller.js';
import express from 'express';

const router = express.Router();

router.post('/signup', userSignUp);
router.post('/login', userLogin);

export default router;