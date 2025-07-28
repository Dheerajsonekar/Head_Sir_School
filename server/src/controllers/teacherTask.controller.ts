import { Request, Response } from "express";
import Task from "../models/Task";

export const getTeacherTasks = async (req: Request, res: Response) => {
  try {
    const teacherId = req.user?.id;;

    const tasks = await Task.find({ assignedTo: teacherId }).sort({ createdAt: -1 });

    res.status(200).json({ tasks });
  } catch (err) {
    console.error("Failed to fetch tasks:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateTaskStatus = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    const { status } = req.body;

    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: "Task not found" });

    task.status = status;
    await task.save();

    res.status(200).json({ message: "Status updated", task });
  } catch (err) {
    console.error("Failed to update task status:", err);
    res.status(500).json({ message: "Server error" });
  }
};
