import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      name: string
      email: string
      role: 'student' | 'teacher' | 'admin' | 'general'
      _id: string
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: string
    _id: string
  }
}
