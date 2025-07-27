import { Router } from 'express';
import { logout, verifyAuth } from '../controllers/auth.controller';

const router = Router();


router.post('/logout', logout);
router.get('/verify', verifyAuth);

export default router;
