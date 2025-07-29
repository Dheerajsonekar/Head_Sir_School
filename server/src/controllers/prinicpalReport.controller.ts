import { Request, Response } from "express";
import Report from "../models/Report";
import Performance from "../models/Performance";
import Attendance from "../models/Attendance";
import Task from "../models/Task";

export const generatePerformanceReport = async (req: Request, res: Response) => {
  try {
    const data = await Performance.find()
      .populate("user", "name email")
      .populate("course", "name");

    const report = await Report.create({
      title: "Performance Report",
      type: "performance",
      generatedBy: req.user?.id,
      data,
    });

    res.status(201).json(report);
  } catch (err) {
    res.status(500).json({ message: "Failed to generate performance report" });
  }
};

export const generateAttendanceReport = async (req: Request, res: Response) => {
  try {
    const data = await Attendance.find()
      .populate("userId", "name email")
      .populate("courseId", "name");

    const report = await Report.create({
      title: "Attendance Report",
      type: "attendance",
      generatedBy: req.user?.id,
      data,
    });

    res.status(201).json(report);
  } catch (err) {
    res.status(500).json({ message: "Failed to generate attendance report" });
  }
};

export const generateTaskReport = async (req: Request, res: Response) => {
  try {
    const data = await Task.find()
      .populate("assignedTo", "name email")
      .populate("assignedBy", "name email");

    const report = await Report.create({
      title: "Task Assignment Report",
      type: "task",
      generatedBy: req.user?.id,
      data,
    });

    res.status(201).json(report);
  } catch (err) {
    res.status(500).json({ message: "Failed to generate task report" });
  }
};

export const getAllReports = async (req: Request, res: Response) => {
  try {
    const reports = await Report.find().populate("generatedBy", "name email");
    res.status(200).json(reports);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch reports" });
  }
};

export const getReportById = async (req: Request, res: Response) => {
  try {
    const report = await Report.findById(req.params.id).populate("generatedBy", "name email");
    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }
    res.status(200).json(report);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch report" });
  }
};
