import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
// to check if added or not in server git --> in real??

export async function middleware(req) {
    //the below token will exist only if the user is logged in

    const token = await getToken({req, secret: process.env.JWT_SECRET});
    const {pathname} = req.nextUrl


    //Alow the request to go through only if the following is true:
    //1-> the token exists
    
    if(pathname.includes('/api/auth') || token)
    {
        return NextResponse.next();

    }

    // redirect into login if they dont have the token and they are going through this protected routeif

    if(!token && pathname!=='/login'){
        return NextResponse.redirect("/login")
    }



}