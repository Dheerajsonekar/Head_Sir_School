import { Request, Response } from "express";
import Attendance from "../models/Attendance";

export const getStudentAttendance = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    const records = await Attendance.find({ userId })
      .populate("courseId", "title")
      .sort({ updatedAt: -1 });

    const formatted = records.map((record) => {
      const course = record.courseId as { title?: string };
      return {
        courseTitle: course?.title || "Untitled",
        total: record.totalClasses,
        attended: record.attendedClasses,
        percentage: record.totalClasses > 0
          ? ((record.attendedClasses / record.totalClasses) * 100).toFixed(1)
          : "N/A"
      };
    });

    res.status(200).json({ attendance: formatted });
  } catch (error) {
    console.error("Error fetching attendance:", error);
    res.status(500).json({ error: "Failed to fetch attendance" });
  }
};
