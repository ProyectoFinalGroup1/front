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
    <div className="min-h-screen bg-gray-100 flex items-end py-10 px-4 md:px-10">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6 w-full">
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



























//ORIGINAL
// 'use client'
// import React from "react";
// import DonationForm from "@/app/dashboard/user/components/DonationForm";

// const UserDonacionesView = () => {
//   return (
//     <div className="min-h-screen bg-gray-100 flex items-end py-10 px-4 md:px-10">
//       <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6 w-full">
//         <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 text-center mb-4">
//           Contribuye a un legado de amor
//         </h1>
//         <p className="text-gray-600 text-center mb-6">
//           Tu donación ayuda a mantener este espacio de memoria y paz. Agradecemos tu generosidad y apoyo.
//         </p>

//         {/* Opción de donación única */}
//         <div className="space-y-4">
//           <div className="bg-gray-50 p-4 rounded-lg shadow">
//             <h2 className="text-gray-700 font-medium mb-2">Donación única</h2>
//             <DonationForm />
//           </div>

//           {/* Opción de suscripción (futura implementación) */}
//           <div className="bg-gray-50 p-4 rounded-lg shadow">
//             <h2 className="text-gray-700 font-medium mb-2">Suscripción mensual</h2>
//             <button
//               className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition w-full"
//               disabled
//             >
//               Próximamente
//             </button>
//           </div>
//         </div>

//         {/* Mensaje de agradecimiento */}
//         <div className="mt-6 text-center">
//           <p className="text-gray-600 text-sm">Cada contribución es un acto de amor. Gracias por tu apoyo.</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserDonacionesView;















// import React from 'react'

// const UserDonacionesView = () => {
//   return (
//     <div>Donaciones del Usuario </div>
//   )
// }

// export default UserDonacionesView




















///revisar
// "use client";
// import React, { useEffect, useState } from "react";
// import { useAuth } from "@/context/AuthContext"; // Asegúrate de que esta ruta sea correcta
// import DonationForm from "@/app/dashboard/user/components/DonationForm";

// // Definimos el tipo Donation
// interface Donation {
//   id: string;
//   amount: number;
//   date: string;
// }

// const UserDonacionesView = () => {
//   const { userData } = useAuth(); // Obtenemos userData desde el contexto
//   const [donations, setDonations] = useState<Donation[]>([]);

//   useEffect(() => {
//     if (userData && userData.user && userData.user.idUser) {
//       console.log("User ID asignado:", userData.user.idUser);
//       fetchDonations(userData.user.idUser);
//     } else {
//       console.warn("No se encontró un userId válido en el contexto.");
//     }
//   }, [userData]);

//   const fetchDonations = async (userId: string) => {
//     try {
//       const response = await fetch(`/mercadopago/donaciones-aprobadas/${userId}`);
//       const data: Donation[] = await response.json(); // Aseguramos que 'data' es un array de Donaciones
//       setDonations(data);
//     } catch (error) {
//       console.error("Error al obtener donaciones:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-end py-10 px-4 md:px-10">
//       <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6 w-full">
//         <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 text-center mb-4">
//           Contribuye a un legado de amor
//         </h1>
//         <p className="text-gray-600 text-center mb-6">
//           Tu donación ayuda a mantener este espacio de memoria y paz. Agradecemos tu generosidad y apoyo.
//         </p>

//         {/* Opción de donación única */}
//         <div className="space-y-4">
//           <div className="bg-gray-50 p-4 rounded-lg shadow">
//             <h2 className="text-gray-700 font-medium mb-2">Donación única</h2>
//             <DonationForm />
//           </div>

//           {/* Opción de suscripción (futura implementación) */}
//           <div className="bg-gray-50 p-4 rounded-lg shadow">
//             <h2 className="text-gray-700 font-medium mb-2">Suscripción mensual</h2>
//             <button
//               className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition w-full"
//               disabled
//             >
//               Próximamente
//             </button>
//           </div>
//         </div>

//         {/* Historial de donaciones */}
//         <div className="mt-6">
//           <h2 className="text-gray-700 font-medium text-lg mb-3">Tu historial de donaciones</h2>
//           {donations.length > 0 ? (
//             <ul className="bg-gray-50 p-4 rounded-lg shadow">
//               {donations.map((donation) => (
//                 <li key={donation.id} className="flex justify-between border-b py-2">
//                   <span className="text-gray-700">${donation.amount.toFixed(2)}</span>
//                   <span className="text-gray-500 text-sm">
//                     {new Date(donation.date).toLocaleDateString()}
//                   </span>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p className="text-gray-500 text-sm">Aún no has realizado donaciones.</p>
//           )}
//         </div>

//         {/* Mensaje de agradecimiento */}
//         <div className="mt-6 text-center">
//           <p className="text-gray-600 text-sm">Cada contribución es un acto de amor. Gracias por tu apoyo.</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserDonacionesView;




























