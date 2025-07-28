import { Request, Response } from "express";
import User from "../models/User";

export const getTeacherProfile = async (req: Request, res: Response) => {
  try {
    const teacherId = req.user?.id; // from auth middleware
    const profile = await User.findById(teacherId).select("-password");

    if (!profile || profile.role !== "teacher") {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json({ profile });
  } catch (err) {
    console.error("Error fetching teacher profile:", err);
    res.status(500).json({ message: "Server error" });
  }
};
