import { Request, Response } from "express";
import Attendance from "../models/Attendance";
import User from "../models/User";
import Course from "../models/Course";

export const getAllAttendance = async (req: Request, res: Response) => {
  try {
    const attendanceData = await Attendance.find()
      .populate("userId", "name email")
      .populate("courseId", "name");

    res.status(200).json(attendanceData);
  } catch (err) {
    console.error("Error fetching attendance:", err);
    res.status(500).json({ message: "Server error" });
  }
};
