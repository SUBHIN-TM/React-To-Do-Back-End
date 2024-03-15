import express from 'express' ;
import { loginPost, signupPost } from '../controllers/userControllers.js';

const router = express.Router();

router.post('/login', loginPost);
router.post('/signup', signupPost);

export default router;
