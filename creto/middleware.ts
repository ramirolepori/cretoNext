import { NextResponse } from 'next/server';
import { withAuth } from 'next-auth/middleware';

export default withAuth({
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
  },
});

export const config = {
  matcher: ['/dashboard', '/another-protected-page'],
};
