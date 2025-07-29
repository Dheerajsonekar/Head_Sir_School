import express from 'express';
import { registerPrincipal, loginPrincipal } from '../controllers/principal.controller';
import { authenticate } from '../middlewares/authMiddleware';
import { getPrincipalDashboard } from '../controllers/principalDashboard.controller';
import { getAllTeachers, createTeacher, deleteTeacher } from '../controllers/principalTeacher.controller';
import { getAllStudents, createStudent, deleteStudent } from '../controllers/principalStudent.controller';
import { getPrincipalProfile } from '../controllers/principalProfile.controller';
import { getAllTasks, createTask, deleteTask } from '../controllers/principalTask.controller';
import { generatePerformanceReport, generateAttendanceReport, generateTaskReport, getAllReports, getReportById  } from '../controllers/prinicpalReport.controller';

const router = express.Router();

// POST /api/teacher/register
router.post('/register', registerPrincipal);

// POST /api/teacher/login
router.post('/login', loginPrincipal);

// GET /api/principal/dashboard
router.get('/dashboard', authenticate, getPrincipalDashboard);

// GET /api/principal/teachers
router.get('/teachers', authenticate, getAllTeachers);

// POST /api/principal/teachers
router.post('/teachers', authenticate, createTeacher);  

// DELETE /api/principal/teachers/:id
router.delete('/teachers/:id', authenticate, deleteTeacher);

// GET /api/principal/students
router.get('/students', authenticate, getAllStudents);

// POST /api/principal/students
router.post('/students', authenticate, createStudent);

// DELETE /api/principal/students/:id
router.delete('/students/:id', authenticate, deleteStudent);

// GET /api/principal/profile
router.get('/profile', authenticate, getPrincipalProfile);

// GET /api/principal/tasks
router.get('/tasks', authenticate, getAllTasks);

// POST /api/principal/tasks
router.post('/tasks', authenticate, createTask);

// DELETE /api/principal/tasks/:id
router.delete('/tasks/:id', authenticate, deleteTask);

// GET /api/principal/reports
router.get('/reports', authenticate, getAllReports);    

// GET /api/principal/reports/:id   
router.get('/reports/:id', authenticate, getReportById);

// POST /api/principal/reports/performance
router.post('/reports/performance', authenticate, generatePerformanceReport);

// POST /api/principal/reports/attendance
router.post('/reports/attendance', authenticate, generateAttendanceReport);

// POST /api/principal/reports/task
router.post('/reports/task', authenticate, generateTaskReport);

export default router;
