import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;

    // Create the response
    let response = NextResponse.next();

    // Handle meeting pages - allow public access to /meeting but protect /meeting/host
    if (pathname.startsWith("/meeting/") && pathname !== "/meeting-room") {
      // Set headers for cross-site cookies and iframe embedding
      response.headers.set("X-Frame-Options", "SAMEORIGIN");
      response.headers.set(
        "Content-Security-Policy",
        "frame-ancestors 'self' *.8x8.vc *.jitsi.net"
      );
      response.headers.set(
        "Permissions-Policy",
        "microphone=*, camera=*, speaker-selection=*, display-capture=*"
      );
      response.headers.set("Cross-Origin-Embedder-Policy", "unsafe-none");
      response.headers.set(
        "Cross-Origin-Opener-Policy",
        "same-origin-allow-popups"
      );

      // Set SameSite=None for cross-site cookies
      const cookieHeader = response.headers.get("Set-Cookie") || "";
      if (cookieHeader) {
        const updatedCookie = cookieHeader
          .replace(/SameSite=\w+/gi, "SameSite=None")
          .concat("; Secure");
        response.headers.set("Set-Cookie", updatedCookie);
      }

      // Check if this is the host route - require authentication
      if (pathname.startsWith("/meeting/host")) {
        if (!token) {
          const loginUrl = new URL("/login", req.url);
          loginUrl.searchParams.set("callbackUrl", req.url);
          return NextResponse.redirect(loginUrl);
        }
      }

      // Allow public access to other meeting routes (like /meeting/[...id])
      return response;
    }

    // Handle direct /meeting route - allow public access
    if (pathname === "/meeting") {
      return response;
    }

    // Allow access to login page and auth routes
    if (pathname.startsWith("/login") || pathname.startsWith("/api/auth")) {
      return response;
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

    return response;
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
