import express from 'express';
import { registerStudent, loginStudent, getStudentProfile } from '../controllers/student.controller';
import { getStudentDashboardData } from "../controllers/studentDashboard.controller";
import {getStudentCourses } from "../controllers/StudentCourseController";
import { getStudentFees } from "../controllers/studentFee.controller";
import { getStudentResults } from "../controllers/studentResult.controller";
import { getStudentAttendance } from "../controllers/studentAttendance.controller";

import { authenticate } from "../middlewares/authMiddleware";

const router = express.Router();

// POST /api/student/register
router.post('/register', registerStudent);

// POST /api/student/login
router.post('/login', loginStudent);

router.get('/profile',authenticate,  getStudentProfile);

router.get("/dashboard", authenticate, getStudentDashboardData);

// GET /api/student/courses
router.get('/courses', authenticate, getStudentCourses);

// GET /api/student/fees
router.get('/fees', authenticate, getStudentFees);

// GET /api/student/results
router.get('/results', authenticate, getStudentResults);

// GET /api/student/attendance
router.get('/attendance', authenticate, getStudentAttendance);

export default router;
