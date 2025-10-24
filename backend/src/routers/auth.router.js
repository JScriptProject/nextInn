import {userSignUp} from '../controllers/userSignUp.controller.js';
import express from 'express';

const router = express.Router();

router.post('/userSignUp', userSignUp);

export default router;