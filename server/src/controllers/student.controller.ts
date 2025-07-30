
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const registerStudent = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: 'Email already registered' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'student',
    });

    res.status(201).json({
      message: 'Student registered successfully',
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Registration failed' });
  }
};

export const loginStudent = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const student = await User.findOne({ email });
    if (!student)
      return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch)
      return res.status(400).json({ message: 'Invalid credentials' });

    if (student.role !== 'student')
      return res.status(403).json({ message: 'Access denied: Not a student' });

    const token = jwt.sign({ id: student._id, role: student.role }, JWT_SECRET, {
      expiresIn: '7d',
    });

    // // ⭐ CRITICAL FIX: Proper cookie configuration for localhost
    // const cookieOptions = {
    //   httpOnly: true,
    //   secure: false, // ⭐ MUST be false for localhost HTTP
    //   sameSite: 'lax' as const, // ⭐ MUST be 'lax' for localhost
    //   maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    //   path: '/', // ⭐ CRITICAL: Explicit path
    //   domain: undefined, // ⭐ CRITICAL: Don't set domain for localhost
    // };

    const isProduction = process.env.NODE_ENV === 'production';

    const cookieOptions = {
      httpOnly: true,
      secure: isProduction, // true in production, false in development
      sameSite: isProduction ? 'none' as const : 'lax' as const,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/',
    };

    console.log('🍪 Setting cookie with options:', cookieOptions);
    console.log('🔑 Token being set:', token.substring(0, 20) + '...');

    res
      .status(200)
      .cookie('token', token, cookieOptions)
      .json({
        message: 'Student login successful',
        user: {
          _id: student._id,
          name: student.name,
          email: student.email,
          role: student.role,
        },
      });

    console.log('✅ Login successful for:', student.name);
    console.log('🔧 Response headers will include Set-Cookie');

  } catch (err) {
    console.error('❌ Login error:', err);
    res.status(500).json({ message: 'Login failed' });
  }
};


export const getStudentProfile = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const user = await User.findById(decoded.id).select("-password");

    if (!user || user.role !== "student") {
      return res.status(403).json({ message: "Access denied" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Student fetch error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};