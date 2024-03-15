import express from 'express' ;
import { loginPost, signupPost,dashboardGet } from '../controllers/userControllers.js';

const router = express.Router();

router.post('/login', loginPost);
router.post('/signup', signupPost);
router.get('/dashboard', dashboardGet);



export default router;
