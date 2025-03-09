'use client';
import React, { useEffect, useState } from "react";
import DonationForm from "@/app/dashboard/user/components/DonationForm";
import { useAuth } from "@/context/AuthContext";

type Donacion = {
  idDonacion: string;
  monto: number;
  Date: string;
  Estado: boolean;
  mensajeAgradecimiento: string;
  mostrarEnMuro: boolean;
  nombreMostrar: string;
  transactionId: string;
  metodoPago: string;
};

const UserDonacionesView = () => {
  const { userData } = useAuth();
  const [donaciones, setDonaciones] = useState<Donacion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);  

  useEffect(() => {
    const fetchDonaciones = async () => {
      try {
        const userId = userData?.user?.idUser;

        if (userId) {
          // Usamos la URL desde las variables de entorno
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mercadopago/donaciones-aprobadas/${userId}`);
          if (!response.ok) {
            throw new Error("Error al obtener las donaciones");
          }
          const data: Donacion[] = await response.json();
          setDonaciones(data);
        } else {
          setError("No se pudo obtener el ID del usuario.");
        }
      } catch (err: unknown) {
        if (err instanceof Error) {  
          setError(err.message);  
        } else {
          setError("Ocurrió un error desconocido");
        }
      } finally {
        setLoading(false);
      }
    };

    if (userData?.user?.idUser) {
      fetchDonaciones();
    }
  }, [userData]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-end">
      <div className="max-w-4xl mx-auto bg-white shadow-lg p-6 w-full">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 text-center mb-4">
          Contribuye a un legado de amor
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Tu donación ayuda a mantener este espacio de memoria y paz. Agradecemos tu generosidad y apoyo.
        </p>

        {/* Opción de donación única */}
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg shadow">
            <h2 className="text-gray-700 font-medium mb-2">Donación única</h2>
            <DonationForm />
          </div>

          {/* Opción de suscripción (futura implementación) */}
          <div className="bg-gray-50 p-4 rounded-lg shadow">
            <h2 className="text-gray-700 font-medium mb-2">Suscripción mensual</h2>
            <button
              className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition w-full"
              disabled
            >
              Próximamente
            </button>
          </div>
        </div>

        {/* Mensaje de agradecimiento */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">Cada contribución es un acto de amor. Gracias por tu apoyo.</p>
        </div>

        {/* Historial de donaciones */}
        {loading && <p>Cargando...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>} {/* Mostramos el mensaje de error aquí */}

        <div>
          {donaciones.length === 0 ? (
            <p className="text-center text-gray-600">No has realizado ninguna donación aún.</p>
          ) : (
            <ul className="space-y-4 mt-6">
              {donaciones.map((donacion) => (
                <li key={donacion.idDonacion} className="bg-gray-50 p-4 rounded-lg shadow">
                  <p className="font-semibold text-gray-700">Importe: ${donacion.monto}</p>
                  <p className="text-gray-600">Fecha de donación: {new Date(donacion.Date).toLocaleDateString()}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDonacionesView;








