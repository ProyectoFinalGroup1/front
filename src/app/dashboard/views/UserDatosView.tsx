"use client";

import { useAuth } from "@/context/AuthContext";

const UserDatosView = () => {
  const { userData } = useAuth();
  

  // para detectar si el usuario inició sesión con Google ("provider" es opcional en la propiedad de user = IUserSession)
  const esGoogleUser = userData?.user?.provider === "google" || !userData?.user?.apellido;

  return (
    <div className="min-h-screen bg-white py-10 px-4 md:px-10">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">
          Perfil de Usuario
        </h2>
  
        <div className="space-y-4">
          {esGoogleUser ? (
            <>
              <div className="p-4 border rounded-lg bg-gray-50 shadow-sm">
                <p className="text-gray-600 text-sm">Nombre y Apellido:</p>
                <p className="text-lg font-medium text-gray-800">
                  {userData?.user?.nombre || "No disponible"}
                </p>
              </div>
  
              <div className="p-4 border rounded-lg bg-gray-50 shadow-sm">
                <p className="text-gray-600 text-sm">Email:</p>
                <p className="text-lg font-medium text-gray-800">
                  {userData?.user?.email || "No disponible"}
                </p>
              </div>

              <div className="p-4 border rounded-lg bg-gray-50 shadow-sm">
                <p className="text-gray-600 text-sm">DNI:</p>
                <p className="text-lg font-medium text-gray-800">
                  {userData?.user?.dni || "No disponible"}
                </p>
              </div>

              <div className="p-4 border rounded-lg bg-gray-50 shadow-sm">
                <p className="text-gray-600 text-sm">Numero de Contacto:</p>
                <p className="text-lg font-medium text-gray-800">
                  {userData?.user?.phoneNumber || "No disponible"}
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="p-4 border rounded-lg bg-gray-50 shadow-sm">
                <p className="text-gray-600 text-sm">Nombre:</p>
                <p className="text-lg font-medium text-gray-800">
                  {userData?.user?.nombre || "No disponible"}
                </p>
              </div>
  
              <div className="p-4 border rounded-lg bg-gray-50 shadow-sm">
                <p className="text-gray-600 text-sm">Apellido:</p>
                <p className="text-lg font-medium text-gray-800">
                  {userData?.user?.apellido || "No disponible"}
                </p>
              </div>
  
              <div className="p-4 border rounded-lg bg-gray-50 shadow-sm">
                <p className="text-gray-600 text-sm">Email:</p>
                <p className="text-lg font-medium text-gray-800">
                  {userData?.user?.email || "No disponible"}
                </p>
              </div>

              <div className="p-4 border rounded-lg bg-gray-50 shadow-sm">
                <p className="text-gray-600 text-sm">DNI:</p>
                <p className="text-lg font-medium text-gray-800">
                  {userData?.user?.dni || "No disponible"}
                </p>
              </div>

              <div className="p-4 border rounded-lg bg-gray-50 shadow-sm">
                <p className="text-gray-600 text-sm">Numero de Contacto:</p>
                <p className="text-lg font-medium text-gray-800">
                  {userData?.user?.phoneNumber || "No disponible"}
                </p>
              </div>

            </>
          )}
        </div>
      </div>
    </div>
  );
}  

export default UserDatosView;
