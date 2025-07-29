import { Request, Response } from 'express';
import User from '../models/User';

// Get all teachers
export const getAllTeachers = async (req: Request, res: Response) => {
  try {
    const teachers = await User.find({ role: 'teacher' }).select('-password');
    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch teachers' });
  }
};

// Create a new teacher
export const createTeacher = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const newTeacher = await User.create({
      name,
      email,
      password,
      role: 'teacher',
    });

    res.status(201).json({ message: 'Teacher created successfully', teacher: newTeacher });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create teacher' });
  }
};

// Delete a teacher
export const deleteTeacher = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: 'Teacher deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete teacher' });
  }
};
