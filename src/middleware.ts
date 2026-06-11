import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const publicRoutes = [
  "/login",
  "/signup",
  "/forgot-password",
  "/reset-password",
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token) {
    try {
      const keyBytes = Uint8Array.from(atob(process.env.JWT_SECRET!), (c) =>
        c.charCodeAt(0),
      );
      const secret = keyBytes;
      const { payload } = await jwtVerify(token, secret);
      const role = payload.role as string;

      if (isPublicRoute) {
        console.log("redirecting based on role...");
        if (role === "ADMIN")
          return NextResponse.redirect(
            new URL("/admin/dashboard", request.url),
          );
        if (role === "MANAGER")
          return NextResponse.redirect(
            new URL("/manager/dashboard", request.url),
          );
        return NextResponse.redirect(new URL("/employee/profile", request.url));
      }
    } catch (e) {
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("token");
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
