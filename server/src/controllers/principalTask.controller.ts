import { Request, Response } from "express";
import Task from "../models/Task";
import User from "../models/User";

// Get all tasks assigned by the principal
export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find()
      .populate("assignedTo", "name email")
      .populate("assignedBy", "name email");
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};

// Create task
export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description, assignedTo, category, status, dueDate } = req.body;
    const task = await Task.create({
      title,
      description,
      assignedTo,
      assignedBy: req.user?.id, // you must set req.user from middleware
      category,
      status,
      dueDate,
    });
    res.status(201).json({ message: "Task created", task });
  } catch (err) {
    res.status(500).json({ message: "Failed to create task" });
  }
};

// Delete task
export const deleteTask = async (req: Request, res: Response) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete task" });
  }
};
