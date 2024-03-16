import express from 'express' ;
import { loginPost, signupPost,dashboardGet,addTask ,logout} from '../controllers/userControllers.js';

const router = express.Router();

router.post('/login', loginPost);
router.post('/signup', signupPost);
router.post('/addTask', addTask);
router.get('/dashboard', dashboardGet);
router.get('/logout', logout);




export default router;
