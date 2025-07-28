import { Request, Response } from "express";
import Fee from "../models/Fee";

export const getStudentFees = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;;

    const fees = await Fee.find({ userId }).sort({ dueDate: 1 });

    res.status(200).json({ fees });
  } catch (error) {
    console.error("Error fetching student fees:", error);
    res.status(500).json({ error: "Failed to fetch fees" });
  }
};
