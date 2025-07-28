import { Request, Response } from "express";
import Course from "../models/Course";
import ClassSchedule from "../models/ClassSchedule";
import Assignment from "../models/Assignment";
import Attendance from "../models/Attendance";
import Fee from "../models/Fee";
import Result from "../models/Result";
import User from "../models/User";

export const getStudentDashboardData = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    const user = await User.findById(userId).select("name email role");
    if (!user || user.role !== "student") {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    // Fetch data
    const enrolledCourses = await Course.find({ students: userId });

    const attendanceData = await Attendance.find({ userId });
    let totalClasses = 0;
    let attendedClasses = 0;

    attendanceData.forEach(record => {
      totalClasses += record.totalClasses;
      attendedClasses += record.attendedClasses;
    });

    const attendanceRate = totalClasses > 0 ? `${Math.round((attendedClasses / totalClasses) * 100)}%` : "N/A";

    const results = await Result.find({ userId });
    let gpaSum = 0;
    results.forEach(result => {
      const gradeMap: Record<string, number> = {
        A: 4.0,
        "A-": 3.7,
        "B+": 3.3,
        B: 3.0,
        C: 2.0,
        D: 1.0,
        F: 0,
      };
      gpaSum += gradeMap[result.grade] || 0;
    });
    const averageGrade = results.length > 0 ? (gpaSum / results.length).toFixed(2) : "N/A";

    const pendingFees = await Fee.findOne({ userId, isPaid: false });

    const upcomingClasses = await ClassSchedule.find({ students: userId })
      .sort({ date: 1 })
      .limit(3)
      .populate("course");

    const assignments = await Assignment.find({ userId })
      .sort({ dueDate: 1 })
      .limit(3)
      .populate("courseId");

    const recentGrades = await Result.find({ userId })
      .sort({ date: -1 })
      .limit(4)
      .populate("courseId");

    // Final Response
    return res.status(200).json({
      student: user,
      stats: {
        enrolledCourses: enrolledCourses.length,
        attendanceRate,
        averageGrade,
        pendingFees: pendingFees ? `₹${pendingFees.amountDue}` : "₹0",
      },
      upcomingClasses: upcomingClasses.length > 0 ? upcomingClasses : [],
      assignments: assignments.length > 0 ? assignments : [],
      recentGrades: recentGrades.length > 0 ? recentGrades : [],
    });
  } catch (error) {
    console.error("Dashboard Fetch Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
