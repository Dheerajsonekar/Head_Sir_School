import { Request, Response } from "express";
import User from "../models/User";
import Course from "../models/Course";
import ClassSchedule from "../models/ClassSchedule";
import Performance from "../models/Performance"; // Optional: if you track performance
import moment from "moment";

export const getPrincipalDashboard = async (req: Request, res: Response) => {
  try {
    const totalTeachers = await User.countDocuments({ role: "teacher" });
    const totalStudents = await User.countDocuments({ role: "student" });
    const activeClasses = await ClassSchedule.countDocuments({
      date: { $gte: moment().startOf("day").toDate(), $lte: moment().endOf("day").toDate() }
    });

    // Optional: Calculate average performance from some model
    const allPerformances = await Performance.find(); // optional
    const avgPerformance =
      allPerformances.length > 0
        ? Math.round(
            allPerformances.reduce((sum, p) => sum + (p.score || 0), 0) / allPerformances.length
          )
        : 0;

    const recentActivities = [
      { action: "New teacher registered", time: "2 hours ago", status: "success" },
      { action: "Monthly report generated", time: "4 hours ago", status: "info" },
      { action: "Student performance review", time: "1 day ago", status: "warning" },
      { action: "System maintenance completed", time: "2 days ago", status: "success" }
    ];

    res.status(200).json({
      totalTeachers,
      totalStudents,
      activeClasses,
      performanceRate: avgPerformance,
      recentActivities,
      uptime: "99.9%" // static value or compute if needed
    });
  } catch (error) {
    console.error("Error fetching principal dashboard:", error);
    res.status(500).json({ message: "Failed to load dashboard data" });
  }
};
