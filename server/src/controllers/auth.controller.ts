// controllers/auth.controller.ts - ENHANCED WITH DEBUG
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const logout = (req: Request, res: Response) => {
  try {
    console.log('🚪 Logout request received');
    console.log('🍪 Current cookies:', req.cookies);
    
    const cookieOptions = {
      httpOnly: true,
      secure: false, // ⭐ Must match login settings
      sameSite: 'lax' as const, // ⭐ Must match login settings
      path: '/',
    };

    // Clear cookie with same options as when set
    res.clearCookie('token', cookieOptions);
    
    // Additional clearing strategy
    res.cookie('token', '', {
      ...cookieOptions,
      expires: new Date(0),
      maxAge: 0,
    });

    console.log('🧹 Cookie cleared successfully');
    return res.status(200).json({ 
      message: "Logout successful",
      success: true 
    });
  } catch (error) {
    console.error("❌ Logout error:", error);
    return res.status(500).json({ 
      message: "Logout failed",
      success: false 
    });
  }
};

export const verifyAuth = async (req: Request, res: Response) => {
  try {
    console.log('🔍 Auth verification request');
    console.log('📋 All cookies:', req.cookies);
    console.log('📋 Raw cookie header:', req.headers.cookie);
    console.log('📋 Request origin:', req.headers.origin);
    console.log('📋 User-Agent:', req.headers['user-agent']);
    
    const token = req.cookies.token;
    
    if (!token) {
      console.log('❌ No token found in cookies');
      console.log('🔍 Available cookies:', Object.keys(req.cookies));
      return res.status(200).json({ 
        message: 'No token found', 
        user: null,
        authenticated: false,
        debug: {
          cookiesReceived: req.cookies,
          tokenExists: false,
          rawCookieHeader: req.headers.cookie,
        }
      });
    }

    console.log('🔐 Token found:', token.substring(0, 20) + '...');
    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET) as { id: string; role: string };
      console.log('✅ Token decoded successfully:', { id: decoded.id, role: decoded.role });
    } catch (jwtError: any) {
      console.log('❌ JWT verification failed:', jwtError.message);
      // Clear invalid token
      res.clearCookie('token');
      return res.status(401).json({ 
        message: 'Invalid token', 
        user: null,
        authenticated: false,
        debug: {
          tokenExists: true,
          jwtError: jwtError.message,
        }
      });
    }
    
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      console.log('❌ User not found for id:', decoded.id);
      res.clearCookie('token');
      return res.status(401).json({ 
        message: 'User not found', 
        user: null,
        authenticated: false,
        debug: {
          tokenExists: true,
          tokenValid: true,
          userExists: false,
          userId: decoded.id,
        }
      });
    }

    console.log('✅ User verified:', user.name, user.role);
    res.status(200).json({
      message: 'Token valid',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      authenticated: true,
      debug: {
        tokenExists: true,
        tokenValid: true,
        userExists: true,
        userName: user.name,
      }
    });
  } catch (error) {
    console.error('❌ Auth verification error:', error);
    return res.status(401).json({ 
      message: 'Server error during authentication', 
      user: null,
      authenticated: false,
      debug: {
        serverError: true,
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    });
  }
};