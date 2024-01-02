import { Router } from 'express';
import { addUser, signup, logout, getUserById, login } from "../controllers/authController.js";
import  { requireAuth, logger }  from '../middleware/authMiddleware.js';
const router = Router();
router.post('/login', login);
router.post('/addUser', requireAuth, addUser);
router.post('/signup', logger, signup);
router.get('/logout', logout);
router.get('/users/:id', getUserById);

export default router;