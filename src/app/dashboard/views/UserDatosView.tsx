"use client";

import { useAuth } from "@/context/AuthContext";

const UserDatosView = () => {
  const { userData } = useAuth();
  

  // para detectar si el usuario inició sesión con Google ("provider" es opcional en la propiedad de user = IUserSession)
  const esGoogleUser = userData?.user?.provider === "google" || !userData?.user?.apellido;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">Perfil de Usuario</h2>

        <div className="space-y-4">
          {esGoogleUser ? (
            
            <>
              <div className="p-3 border rounded-lg bg-gray-50">
                <p className="text-gray-600 text-sm">Nombre y Apellido: </p>
                <p className="text-lg font-medium text-gray-800">
                  {userData?.user?.nombre || "No disponible"}
                </p>
              </div>

              <div className="p-3 border rounded-lg bg-gray-50">
                <p className="text-gray-600 text-sm">Email: </p>
                <p className="text-lg font-medium text-gray-800">{userData?.user?.email || "No disponible"}</p>
              </div>
            </>
          ) : (
           
            <>
              <div className="p-3 border rounded-lg bg-gray-50">
                <p className="text-gray-600 text-sm">Nombre: </p>
                <p className="text-lg font-medium text-gray-800">{userData?.user?.nombre || "No disponible"}</p>
              </div>

              <div className="p-3 border rounded-lg bg-gray-50">
                <p className="text-gray-600 text-sm">Apellido: </p>
                <p className="text-lg font-medium text-gray-800">{userData?.user?.apellido || "No disponible"}</p>
              </div>

              <div className="p-3 border rounded-lg bg-gray-50">
                <p className="text-gray-600 text-sm">Email:</p>
                <p className="text-lg font-medium text-gray-800">{userData?.user?.email || "No disponible"}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDatosView;
