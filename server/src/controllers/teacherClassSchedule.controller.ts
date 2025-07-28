import { Request, Response } from "express";
import ClassSchedule from "../models/ClassSchedule";
import Course from "../models/Course";

export const getMyClasses = async (req: Request, res: Response) => {
  try {
    const teacherId = req.user?.id; // populated by authenticate middleware

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const classes = await ClassSchedule.find({
      teacher: teacherId,
      date: { $gte: today, $lt: tomorrow },
    })
      .populate("course", "name")
      .populate("students", "name");

    res.json(classes);
  } catch (error) {
    console.error("Error fetching classes:", error);
    res.status(500).json({ error: "Failed to fetch class schedule" });
  }
};
