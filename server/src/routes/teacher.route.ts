import express from 'express';
import { registerTeacher, loginTeacher } from '../controllers/teacher.controller';
import { getTeacherDashboard } from '../controllers/teacherDashboard.controller';
import { authenticate } from '../middlewares/authMiddleware';

const router = express.Router();

// POST /api/teacher/register
router.post('/register', registerTeacher);

// POST /api/teacher/login
router.post('/login', loginTeacher);

// GET /api/teacher/dashboard
router.get('/dashboard', authenticate, getTeacherDashboard);

export default router;
