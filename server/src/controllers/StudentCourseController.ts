import { Request, Response } from "express";
import Course from "../models/Course";

export const getStudentCourses = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id; // Ensure you have middleware that sets this from token

    const courses = await Course.find({ students: userId }).populate("students", "name email");

    res.status(200).json({ courses });
  } catch (err) {
    console.error("Failed to fetch student courses:", err);
    res.status(500).json({ error: "Failed to fetch courses" });
  }
};
