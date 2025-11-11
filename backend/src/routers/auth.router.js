import {userSignUp} from '../controllers/authControllers/userSignUp.controller.js';
import express from 'express';

const router = express.Router();

router.post('/signup', userSignUp);

export default router;