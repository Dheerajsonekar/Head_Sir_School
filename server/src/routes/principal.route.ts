import express from 'express';
import { registerPrincipal, loginPrincipal } from '../controllers/principal.controller';

const router = express.Router();

// POST /api/teacher/register
router.post('/register', registerPrincipal);

// POST /api/teacher/login
router.post('/login', loginPrincipal);

export default router;
