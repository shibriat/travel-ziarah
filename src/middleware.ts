import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import type { User, UserRole } from '@/types/auth'

const roleHierarchy: Record<UserRole, number> = {
  user: 1,
  moderator: 2,
  admin: 3
};

const hasPermission = (userRole: UserRole, requiredRole: UserRole): boolean => {
  return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
}

export function middleware(request: NextRequest) {
  const cookie = request.cookies.get('auth_user')
  const isAuthenticated = !!cookie

  const { pathname } = request.nextUrl

  if (!isAuthenticated && pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (isAuthenticated) {
    const user: User = JSON.parse(cookie.value)

    if (pathname.startsWith('/users') && !hasPermission(user.role, 'moderator')) {
      return NextResponse.redirect(new URL('/', request.url))
    }

    if (pathname.startsWith('/developer') && !hasPermission(user.role, 'admin')) {
      return NextResponse.redirect(new URL('/', request.url))
    }

    if (pathname === '/login') {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
