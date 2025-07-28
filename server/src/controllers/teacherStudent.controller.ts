import { Request, Response } from "express";
import User from "../models/User";

export const getAllStudents = async (req: Request, res: Response) => {
  try {
    const students = await User.find({ role: "student" }).select("name email createdAt");
    res.status(200).json(students);
  } catch (err) {
    console.error("Error fetching students:", err);
    res.status(500).json({ message: "Server error" });
  }
};
