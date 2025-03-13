import { NextURL } from 'next/dist/server/web/next-url';
import { NextResponse, NextRequest } from 'next/server';
 
export function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;
  const userDataCookie = request.cookies.get("userData")?.value;
  
  // Si no hay sesión y trata de acceder a rutas protegidas
  if ((pathname.startsWith("/dashboard") ||
      pathname === "/obituarios" ||
      pathname === "/donacion" ||
      pathname === "/donacion/success" ||
      pathname === "/donacion/failure" ||
      pathname === "/donacion/pending"
      ) && !userDataCookie) {
    const LoginUrl = new NextURL("/login", origin);
    const response = NextResponse.redirect(LoginUrl);

    response.cookies.set("authError", "Tenés que Iniciar Sesión para acceder", {
      path: "/",
      maxAge: 10,
    });

    return response;
  }

  // Si hay sesión, verificar el rol del usuario
  if (userDataCookie) {
    try {
      const userData = JSON.parse(userDataCookie);
      const isAdmin = userData.user?.isAdmin; // Accediendo a user.isAdmin
      
      // Si es usuario normal y trata de acceder al dashboard de admin
      if (!isAdmin && pathname.startsWith("/dashboard/admin")) {
        return NextResponse.redirect(new NextURL("/dashboard/user", origin));
      }

      // **El admin puede acceder a ambos dashboards, así que no se le redirige**
      
    } catch (error) {
      console.error("Error al parsear userData:", error);
    }
  }
  
  return NextResponse.next();
}
