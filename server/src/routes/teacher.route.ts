import express from 'express';
import { registerTeacher, loginTeacher } from '../controllers/teacher.controller';

const router = express.Router();

// POST /api/teacher/register
router.post('/register', registerTeacher);

// POST /api/teacher/login
router.post('/login', loginTeacher);

export default router;
