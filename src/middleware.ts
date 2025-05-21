import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { auth } from "@/features/auth/auth";


export default async function middleware(request: NextRequest) {
    const session = await auth();
    const isProtected = request.nextUrl.pathname !== "/login" && !request.nextUrl.pathname.startsWith("/api/auth");
    const isAuth = !!session?.user;

    if (isProtected && !isAuth) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // if (request.nextUrl.pathname === "/login" && isAuth) {
    //     return NextResponse.redirect(new URL("/dashboard", request.url));
    // }

    return NextResponse.next(); 

}

// Define which routes should be processed by this middleware
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api/auth).*)']
};