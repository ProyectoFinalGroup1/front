"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase, checkAndCreateUser } from "@/lib/supabase";
import toast from "react-hot-toast";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        console.log("Auth callback started");
        const { data, error: sessionError } = await supabase.auth.getSession();

        if (sessionError) {
          console.error("Error getting session:", sessionError);
          setError("Error de autenticación");
          setTimeout(() => router.push("/login?error=auth-failed"), 2000);
          return;
        }

        if (!data.session) {
          console.error("No session found");
          setError("No se encontró sesión");
          setTimeout(() => router.push("/login"), 2000);
          return;
        }

        console.log("Session found, checking user");

        try {
          // Check if user exists in custom table and create if not
          const dbUser = await checkAndCreateUser(data.session.user);
          console.log("User check/create completed:", dbUser);

          if (dbUser) {
            // Muestra el toast de éxito
            toast.success('¡Has iniciado sesión!');

            // Redirige al dashboard solo si el usuario fue creado/verificado correctamente
            setTimeout(() => router.push("/"), 1000);
          } else {
            setError("Error al crear usuario");
            setTimeout(() => router.push("/login?error=user-creation-failed"), 2000);
          }
        } catch (userError: unknown) {
          console.error("Error checking/creating user:", userError);
          if (userError instanceof Error) {
            setError(`Error al crear usuario: ${userError.message || "Error desconocido"}`);
          } else {
            setError("Error desconocido al crear usuario");
          }
          setTimeout(() => router.push("/login?error=user-creation-failed"), 2000);
        }
      } catch (error: unknown) {
        console.error("Unexpected error during auth callback:", error);
        if (error instanceof Error) {
          setError(`Error inesperado: ${error.message || "Error desconocido"}`);
        } else {
          setError("Error inesperado");
        }
        setTimeout(() => router.push("/login?error=unexpected"), 2000);
      }
    };

    handleAuthCallback();
  }, [router]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">
          {error ? "Error de autenticación" : "Procesando tu inicio de sesión..."}
        </h1>
        {error ? (
          <div className="text-red-500 mb-4">{error}</div>
        ) : (
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto"></div>
        )}
      </div>

     
    </div>
  );
}
