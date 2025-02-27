import { NextURL } from 'next/dist/server/web/next-url';
import { NextResponse, NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  //console.log(request);
  const {pathname, origin} = request.nextUrl;
  
  // rutas a proteger
  if((pathname === "/dashboard/user" || pathname === "/obituarios") && !request.cookies.get("userData")?.value){
    const LoginUrl = new NextURL("/login", origin)
    return NextResponse.redirect(LoginUrl)
  } else {
    return NextResponse.next();
  }
}
