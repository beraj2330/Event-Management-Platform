// frontend/middleware.ts
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export const middleware = (req: NextRequest) => {

    const token = req.cookies.get('token');         //Retrieves the authentication token from the user's cookies
    const protectedRoutes = ['/dashboard'];         //A list of routes that require the user to be logged in.

    //The requested URL matches a protected route (req.nextUrl.pathname is in protectedRoutes).
    //The user has no valid authentication token (!token).
    if (protectedRoutes.includes(req.nextUrl.pathname) && !token) {

        //Redirects unauthenticated users to the login page
        return NextResponse.redirect(new URL('/login', req.url));
    }
    //If the route isn’t protected or the user has a token, the request proceeds to the requested resource (e.g., /dashboard).
    return NextResponse.next();
}

//specifies which routes should trigger this middleware
export const config = {
    matcher: ['/dashboard/:path*']          //Matches /dashboard and any subroutes under it (e.g., /dashboard/profile, /dashboard/settings).
};
