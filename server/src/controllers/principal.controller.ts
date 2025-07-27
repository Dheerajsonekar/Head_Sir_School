
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const registerPrincipal = async (req: Request, res: Response) => {
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
      role: 'principal',
    });

    res.status(201).json({
      message: 'Principal registered successfully',
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

export const loginPrincipal = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: 'Invalid credentials' });

    if (String(user.role) !== 'principal')
      return res.status(403).json({ message: 'Access denied: Not a principal' });

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: '7d',
    });

    // ⭐ CRITICAL FIX: Proper cookie configuration for localhost
    const cookieOptions = {
      httpOnly: true,
      secure: false, // ⭐ MUST be false for localhost HTTP
      sameSite: 'lax' as const, // ⭐ MUST be 'lax' for localhost
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: '/', // ⭐ CRITICAL: Explicit path
      domain: undefined, // ⭐ CRITICAL: Don't set domain for localhost
    };

    console.log('🍪 Setting cookie with options:', cookieOptions);
    console.log('🔑 Token being set:', token.substring(0, 20) + '...');

    res
      .status(200)
      .cookie('token', token, cookieOptions)
      .json({
        message: 'Principal login successful',
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });

    console.log('✅ Login successful for:', user.name);
    console.log('🔧 Response headers will include Set-Cookie');
    
  } catch (err) {
    console.error('❌ Login error:', err);
    res.status(500).json({ message: 'Login failed' });
  }
};