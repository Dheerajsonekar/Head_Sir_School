// src/controllers/teacherDashboard.controller.ts

import { Request, Response } from 'express';
import ClassSchedule from '../models/ClassSchedule';
import User from '../models/User';
import Attendance from '../models/Attendance';
import Result from '../models/Result';
import Assignment from '../models/Assignment';

export const getTeacherDashboard = async (req: Request, res: Response) => {
  try {
    const teacherId = req.user?.id; // Ensure you have middleware that sets this from token

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Classes for today
    const todayClasses = await ClassSchedule.find({
      teacher: teacherId,
      date: { $gte: today },
    }).populate('course');

    // Total students
    const totalStudents = await User.countDocuments({ role: 'student' });

    // Attendance rate
    const attendanceRecords = await Attendance.find({ userId: { $exists: true } });
    const totalAttendance = attendanceRecords.reduce((acc, curr) => acc + curr.attendedClasses, 0);
    const totalClasses = attendanceRecords.reduce((acc, curr) => acc + curr.totalClasses, 0);
    const attendanceRate = totalClasses > 0 ? (totalAttendance / totalClasses) * 100 : 0;

    // Performance
    const allResults = await Result.find({});
    const avgPerformance =
      allResults.length > 0
        ? allResults.reduce((acc, curr) => acc + parseFloat(curr.grade), 0) / allResults.length
        : 0;

    // Recent updates (sample logic: last 4 updates)
    const recentUpdates = await Assignment.find({}).sort({ updatedAt: -1 }).limit(4).populate('userId');

    res.status(200).json({
      todayClasses,
      totalStudents,
      attendanceRate: attendanceRate.toFixed(1),
      avgPerformance: avgPerformance.toFixed(1),
      recentUpdates,
    });
  } catch (err) {
    console.error('Error loading teacher dashboard:', err);
    res.status(500).json({ error: 'Failed to load dashboard data' });
  }
};
