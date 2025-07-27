// middleware.ts (root level - same as app/ folder)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  console.log('🔍 Middleware checking:', pathname, 'Token exists:', !!token);

  // Protected routes - redirect to login if no token
  const protectedRoutes = ['/student/', '/teacher/', '/principal/'];
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  
  if (isProtectedRoute && !token) {
    console.log('🚫 No token, redirecting to login');
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Login routes - redirect to dashboard if already logged in
  const loginRoutes = ['/', '/teacher/login', '/principal/login'];
  const isLoginRoute = loginRoutes.includes(pathname);
  
  if (isLoginRoute && token) {
    try {
      // You could verify token here, but for simplicity, just check if it exists
      console.log('✅ Token exists, redirecting to dashboard');
      // This is a simple redirect - you might want to decode JWT to get role
      return NextResponse.redirect(new URL('/student/dashboard', request.url));
    } catch (error) {
      console.log('❌ Invalid token, clearing cookie');
      const response = NextResponse.next();
      response.cookies.delete('token');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};