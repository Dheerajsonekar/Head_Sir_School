import express from 'express';
import { registerStudent, loginStudent } from '../controllers/student.controller';

const router = express.Router();

// POST /api/student/register
router.post('/register', registerStudent);

// POST /api/student/login
router.post('/login', loginStudent);

export default router;
