import { Request, Response } from "express";
import Result from "../models/Result";

export const getStudentResults = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id; // Ensure you have middleware that sets this from token

    const results = await Result.find({ userId })
      .populate("courseId", "title")
      .sort({ date: -1 });

    res.status(200).json({ results });
  } catch (error) {
    console.error("Error fetching results:", error);
    res.status(500).json({ error: "Failed to fetch results" });
  }
};
