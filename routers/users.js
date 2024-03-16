import express from 'express' ;
import { loginPost, signupPost,dashboardGet,addTask ,deleteTask} from '../controllers/userControllers.js';
import verify from '../middleware/jwtAuth.js';

const router = express.Router();

router.post('/login', loginPost);
router.post('/signup', signupPost);
router.post('/addTask',verify, addTask);
router.get('/dashboard',verify, dashboardGet);
router.delete('/deleteTask/:id',verify, deleteTask);




export default router;
