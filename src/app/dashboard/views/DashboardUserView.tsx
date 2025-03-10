'use client'
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useAuth } from "@/context/AuthContext"; // Ajusta la ruta según la ubicación de tu contexto

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const DashboardUserView = () => {
  const { userData } = useAuth(); // Obtener datos del usuario desde el contexto de autenticación

  // Estados para las preferencias de notificaciones
  const [newsletter, setNewsletter] = useState(false);
  const [notifications, setNotifications] = useState(false);

  // Cargar las preferencias desde userData
  useEffect(() => {
    if (userData) {
      setNewsletter(userData.user.recibirRecordatoriosAniversarios || false);
      setNotifications(!!userData.user.fechaPago);

    }
  }, [userData]);

  // Manejar cambios en las preferencias
  const handleToggle = async (preference: string, value: boolean) => {
    try {
      const res = await fetch(`${API_URL}/user/${userData?.user.idUser}/preferences`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userData?.token}`, // Enviar token de autenticación
        },
        body: JSON.stringify({ [preference]: value }),
      });

      if (!res.ok) throw new Error("Error al actualizar preferencias");

      if (preference === "recibirRecordatoriosAniversarios") {
        setNewsletter(value);
      } else if (preference === "fechaPago") {
        setNotifications(value);
      }

      toast.success("Preferencia actualizada correctamente");
    } catch (error) {
      toast.error("No se pudo actualizar la preferencia");
    }
  };

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold">Bienvenido a Valle de Paz</h1>
      <p className="mt-2 text-lg">Personaliza tu experiencia en esta sección.</p>

      {/* Configuraciones del usuario */}
      <div className="mt-6 space-y-6">
        {/* Recordatorios de aniversarios */}
        <div className="flex items-center justify-between p-4 bg-white shadow-md rounded-lg">
          <span className="font-medium">Recibir Recordatorios de Aniversarios de sus Seres Queridos 📩</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={newsletter}
              onChange={() => handleToggle("recibirRecordatoriosAniversarios", !newsletter)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-green-500 transition-all relative">
              <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
            </div>
          </label>
        </div>

        {/* Notificaciones de pagos */}
        <div className="flex items-center justify-between p-4 bg-white shadow-md rounded-lg">
          <span className="font-medium">Recibir Notificaciones de Pagos:🔔</span>
          <label className="relative inline-flex items-center cursor-pointer">
          <input
  type="checkbox"
  checked={true} // Siempre activado
  className="sr-only peer"
  onClick={() =>
    toast.error("Las notificaciones de pago son obligatorias y no pueden desactivarse. 😊")
  }/>
            <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-green-500 transition-all relative">
              <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default DashboardUserView;















//CONECTADO AL BACK SIN FUNCIONAR

// 'use client'
// import { useState, useEffect } from "react";

// const DashboardUserView = () => {
//   const [userData, setUserData] = useState<any>(null); // Usamos estado local para almacenar los datos del usuario
//   const [newsletter, setNewsletter] = useState<boolean>(false);
//   const [notifications, setNotifications] = useState<boolean>(false);

//   // Función para obtener el idUser desde localStorage
//   const getUserDataFromLocalStorage = () => {
//     const userSession = localStorage.getItem("userSession");
//     if (userSession) {
//       return JSON.parse(userSession);
//     }
//     return null;
//   };

//   useEffect(() => {
//     const user = getUserDataFromLocalStorage();
//     if (user) {
//       setUserData(user);
//       setNewsletter(user.user.recibirRecordatoriosAniversarios ?? false);
//       setNotifications(user.user.fechaPago !== null);
//     }
//   }, []);

//   // Función para actualizar las preferencias del usuario en el backend
//   const updateUserPreferences = async () => {
//     if (!userData) return;

//     try {
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${userData.user.idUser}/preferences`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${userData.token}`,
//         },
//         credentials: 'include',  // Asegura que las cookies se envíen si es necesario
//         body: JSON.stringify({
//           recibirRecordatoriosAniversarios: newsletter,
//           fechaPago: notifications ? new Date() : null, // Actualizamos la fecha de pago si las notificaciones están activas
//         }),
//       });

//       if (!response.ok) {
//         throw new Error("Error al actualizar las preferencias");
//       }
//       const updatedPreferences = await response.json();
//       console.log("Preferencias actualizadas:", updatedPreferences);
//     } catch (error) {
//       console.error("Error actualizando preferencias:", error);
//     }
//   };

//   // Guardar cambios en localStorage y hacer la actualización en el backend
//   useEffect(() => {
//     if (userData) {
//       localStorage.setItem("newsletter", newsletter.toString());
//       localStorage.setItem("notifications", notifications.toString());
//       updateUserPreferences(); // Llamamos a la función para actualizar las preferencias
//     }
//   }, [newsletter, notifications, userData]);

//   return (
//     <div className="min-h-screen p-6">
//       <h1 className="text-3xl font-bold">Bienvenido a Valle de Paz</h1>
//       <p className="mt-2 text-lg">Personaliza tu experiencia en esta sección.</p>

//       {/* Configuraciones del usuario */}
//       <div className="mt-6 space-y-6">
//         {/* Suscripción a Newsletter */}
//         <div className="flex items-center justify-between p-4 bg-white shadow-md rounded-lg">
//           <span className="font-medium">Recibir Recordatorios de Aniversarios de sus Seres Queridos 📩</span>
//           <label className="relative inline-flex items-center cursor-pointer">
//             <input
//               type="checkbox"
//               checked={newsletter}
//               onChange={() => setNewsletter(!newsletter)}
//               className="sr-only peer"
//             />
//             <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-green-500 transition-all relative">
//               <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
//             </div>
//           </label>
//         </div>

//         {/* Notificaciones Personalizadas */}
//         <div className="flex items-center justify-between p-4 bg-white shadow-md rounded-lg">
//           <span className="font-medium">Recibir Notificaciones de Pagos 🔔</span>
//           <label className="relative inline-flex items-center cursor-pointer">
//             <input
//               type="checkbox"
//               checked={notifications}
//               onChange={() => setNotifications(!notifications)}
//               className="sr-only peer"
//             />
//             <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-green-500 transition-all relative">
//               <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
//             </div>
//           </label>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardUserView;










































// const DashboardUserView = () => {
//     return (
//       <div className="p-6">
//         <h1 className="text-3xl font-semibold text-gray-800">Bienvenido al Dashboard</h1>
//         <p className="mt-2 text-gray-600">Aquí puedes ver estadísticas y gestionar tu cuenta.</p>
//       </div>
//     );
//   };
  
//   export default DashboardUserView;
  