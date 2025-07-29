import { Request, Response } from 'express';
import User from '../models/User';

// Get all students
export const getAllStudents = async (req: Request, res: Response) => {
  try {
    const students = await User.find({ role: 'student' }).select('-password');
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch students' });
  }
};

// Create new student
export const createStudent = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const newStudent = await User.create({
      name,
      email,
      password,
      role: 'student',
    });

    res.status(201).json({ message: 'Student created', student: newStudent });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create student' });
  }
};

// Delete a student
export const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: 'Student deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete student' });
  }
};
