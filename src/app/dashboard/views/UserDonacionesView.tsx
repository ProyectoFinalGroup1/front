'use client';
import React, { useEffect, useState } from "react";
import DonationForm from "@/app/dashboard/user/components/DonationForm";
import { useAuth } from "@/context/AuthContext";
import jsPDF from "jspdf";
import {toast} from "react-hot-toast"

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
        if (userData?.user?.idUser) {
          const userId = userData?.user?.idUser;
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mercadopago/donaciones-aprobadas/${userId}`);
          if (!response.ok) {
            toast.error("No se detectó ninguna donacion por el momento");
        return;
      }
          //   throw new Error("no tenes donaciones aún");
          // }
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

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.text("Historial de Donaciones", 20, 20);

    let y = 30;
    donaciones.forEach((donacion, index) => {
      doc.setFont("helvetica", "normal");
      doc.text(`Donación #${index + 1}`, 20, y);
      doc.text(`Fecha: ${new Date(donacion.Date).toLocaleDateString()}`, 20, y + 10);
      doc.text(`Estado: ${donacion.Estado ? "Aprobada" : "Pendiente"}`, 20, y + 20);
      doc.text(`Monto: $${donacion.monto}`, 20, y + 30);
      doc.text(`Método de Pago: ${donacion.metodoPago}`, 20, y + 40);
      doc.text(`Número de Operación: ${donacion.transactionId}`, 20, y + 50);
      y += 60;
    });

    doc.save("historial_donaciones.pdf");
  };

  return (
    <div className="min-h-screen flex items-end">
      <div className="max-w-4xl mx-auto p-6 w-full">
        <h1 className="text-2xl md:text-3xl font-semibold text-center mb-4">Contribuye a un legado de amor</h1>
        <p className="text-center mb-6">Tu donación ayuda a mantener este espacio de memoria y paz. Agradecemos tu generosidad y apoyo.</p>
        <div className="space-y-4">
          <div className="p-4 rounded-lg">
            <h2 className="font-medium mb-2">Donación única</h2>
            <DonationForm />
          </div>
            <div className="p-4 rounded-lg">
            <h2 className="font-medium mb-2">Suscripción mensual</h2>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition w-full" disabled>Próximamente</button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm">Cada contribución es un acto de amor. Gracias por tu apoyo.</p>
        </div>

        <h2 className="text-2xl font-bold text-center mb-6">Historial de Donaciones</h2>
        {loading && <p className="text-center text-gray-500 animate-pulse">Cargando...</p>}
        {error && <p className="text-red-500 text-center font-semibold">{error}</p>}

        {donaciones.length > 0 && (
          <div className="flex justify-center mb-4">
          </div>
        )}

        <div className="bg-white shadow-lg rounded-xl p-6">
          {donaciones.length === 0 ? (
            <p className="text-center bg-blue-600">No has realizado ninguna donación aún.</p>
          ) : (
            <ul className="space-y-4">
              {donaciones.map((donacion) => (
                <li key={donacion.idDonacion} className="p-6 rounded-lg shadow-sm border-l-4 border-blue-500">
                  <p className="text-gray-600">
                    <span className="font-semibold text-gray-700">Fecha de donación:</span> {new Date(donacion.Date).toLocaleDateString()}
                  </p>
                  <p className="font-semibold text-gray-700 flex items-center gap-2">
                    Estado: <span className={`px-2 py-1 rounded-full text-sm font-medium ${donacion.Estado ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-600"}`}>{donacion.Estado ? "Aprobada" : "Pendiente"}</span>
                  </p>
                  <p className="font-semibold text-gray-700">Importe: <span className="text-green-600">${donacion.monto}</span></p>
                  <p className="font-semibold text-gray-700">Método de Pago: <span className="text-gray-800">{donacion.metodoPago}</span></p>
                  <p className="font-semibold text-gray-700">Número de Operación: <span className="text-gray-800">{donacion.transactionId}</span></p>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="mt-6 text-center">
          <p className="text-sm">🕊️ Descargá tu historial de Donaciones 🕊️</p>
        </div>
      <div className="flex justify-center mt-6 mb-6">
  <button
    onClick={generatePDF}
    className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
  >
    Descargar PDF
  </button>
</div>
      </div>
          

            
    </div>
  );
};

export default UserDonacionesView;



















//codigo funcional pero no anda para build(?)
// 'use client';
// import React, { useEffect, useState } from "react";
// import DonationForm from "@/app/dashboard/user/components/DonationForm";
// import { useAuth } from "@/context/AuthContext";

// type Donacion = {
//   idDonacion: string;
//   monto: number;
//   Date: string;
//   Estado: boolean;
//   mensajeAgradecimiento: string;
//   mostrarEnMuro: boolean;
//   nombreMostrar: string;
//   transactionId: string;
//   metodoPago: string;
// };

// const UserDonacionesView = () => {
//   const { userData } = useAuth();
//   const [donaciones, setDonaciones] = useState<Donacion[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);  

//   useEffect(() => {
//     const fetchDonaciones = async () => {
//       try {
//         const userId = userData?.user?.idUser;

//         if (userId) {
//           // Usamos la URL desde las variables de entorno
//           const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mercadopago/donaciones-aprobadas/${userId}`);
//           if (!response.ok) {
//             throw new Error("Error al obtener las donaciones");
//           }
//           const data: Donacion[] = await response.json();
//           setDonaciones(data);
//         } else {
//           setError("No se pudo obtener el ID del usuario.");
//         }
//       } catch (err: unknown) {
//         if (err instanceof Error) {  
//           setError(err.message);  
//         } else {
//           setError("Ocurrió un error desconocido");
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (userData?.user?.idUser) {
//       fetchDonaciones();
//     }
//   }, [userData]);

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-end">
//       <div className="max-w-4xl mx-auto bg-white shadow-lg p-6 w-full">
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

//         {/* Historial de donaciones */}
//         {loading && <p>Cargando...</p>}
//         {error && <p className="text-red-500 text-center">{error}</p>} {/* Mostramos el mensaje de error aquí */}

//         <div>
//           {donaciones.length === 0 ? (
//             <p className="text-center text-gray-600">No has realizado ninguna donación aún.</p>
//           ) : (
//             <ul className="space-y-4 mt-6">
//               {donaciones.map((donacion) => (
//                 <li key={donacion.idDonacion} className="bg-gray-50 p-4 rounded-lg shadow">
//                   <p className="font-semibold text-gray-700">Importe: ${donacion.monto}</p>
//                   <p className="text-gray-600">Fecha de donación: {new Date(donacion.Date).toLocaleDateString()}</p>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserDonacionesView;








