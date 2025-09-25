import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;

    // Allow access to login page and auth routes
    if (pathname.startsWith("/login") || pathname.startsWith("/api/auth")) {
      return NextResponse.next();
    }

    // Redirect to login if no token and trying to access protected route
    if (!token) {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("callbackUrl", req.url);
      return NextResponse.redirect(loginUrl);
    }

    // Add any role-based access control here if needed
    // Example:
    // if (pathname.startsWith("/admin") && token.role !== "admin") {
    //   return NextResponse.redirect(new URL("/unauthorized", req.url));
    // }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Always return true here, let the middleware function handle the logic
        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - api/auth/* (NextAuth API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     * - debug page (optional, remove in production)
     */
    "/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.svg$|debug).*)",
  ],
};
