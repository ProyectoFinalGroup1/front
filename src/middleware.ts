import { NextResponse, NextRequest } from 'next/server'
import { NextURL } from 'next/dist/server/web/next-url'
import { useAuth } from './context/AuthContext';

export function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;

  // Obtener datos del usuario desde la cookie
  const userDataCookie = request.cookies.get("userData")?.value;
  let userData = null;

  if (userDataCookie) {
    try {
      userData = JSON.parse(userDataCookie); // Convertir la cookie en objeto
    } catch (error) {
      console.error("Error al parsear userData:", error);
    }
  }

  // Verificar si el usuario está autenticado
  const isAuthenticated = !!userData;

  // Verificar si el usuario es administrador
  const isAdmin = userData?.isAdmin === "true";

  // Rutas protegidas para cualquier usuario logueado
  const protectedRoutes = ["/dashboard/user", "/obituarios"];

  // Rutas protegidas solo para administradores
  const adminRoutes = ["/admin-panel", "/config"];

  // Si intenta acceder a una ruta protegida sin autenticarse
  if (protectedRoutes.includes(pathname) && !isAuthenticated) {
    return redirectToLogin(request, origin);
  }

  // Si intenta acceder a una ruta de administrador sin ser admin
  if (adminRoutes.includes(pathname) && !isAdmin) {
    return redirectToHome(request, origin);
  }

  return NextResponse.next();
}

// Función para redirigir al login y setear error
function redirectToLogin(request: NextRequest, origin: string) {
  const LoginUrl = new NextURL("/login", origin);
  const response = NextResponse.redirect(LoginUrl);

  response.cookies.set("authError", "Tenés que Iniciar Sesión para acceder", {
    path: "/",
    maxAge: 10,
  });

  return response;
}

// Función para redirigir al home si no es admin
function redirectToHome(request: NextRequest, origin: string) {
  const HomeUrl = new NextURL("/", origin);
  const response = NextResponse.redirect(HomeUrl);

  response.cookies.set("authError", "No tenés permisos para acceder", {
    path: "/",
    maxAge: 10,
  });

  return response;
}
