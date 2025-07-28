import express from 'express';
import { registerTeacher, loginTeacher } from '../controllers/teacher.controller';
import { getTeacherDashboard } from '../controllers/teacherDashboard.controller';
import { authenticate } from '../middlewares/authMiddleware';
import { getMyClasses } from '../controllers/teacherClassSchedule.controller';
import { getAllStudents } from '../controllers/teacherStudent.controller';
import { getAllAttendance } from '../controllers/teacherStudentAttendance.controller';
import { getTeacherProfile } from '../controllers/teacherProfile.controller';
import { getTeacherTasks, updateTaskStatus } from '../controllers/teacherTask.controller';

const router = express.Router();

// POST /api/teacher/register
router.post('/register', registerTeacher);

// POST /api/teacher/login
router.post('/login', loginTeacher);

// GET /api/teacher/dashboard
router.get('/dashboard', authenticate, getTeacherDashboard);

// GET /api/teacher/classes
router.get('/classes', authenticate, getMyClasses);

// GET /api/teacher/students
router.get('/students', authenticate, getAllStudents);

// GET /api/teacher/attendanceData
router.get('/attendance', authenticate, getAllAttendance);

// GET /api/teacher/profile
router.get('/profile', authenticate, getTeacherProfile);

// GET /api/teacher/tasks
router.get('/tasks', authenticate, getTeacherTasks);

// PUT /api/teacher/tasks/:taskId/status
router.put('/tasks/:taskId/status', authenticate, updateTaskStatus);

export default router;
