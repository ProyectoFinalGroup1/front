'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { IUserDetails } from '@/types';

const UserDatosView = () => {
  const [user, setUser] = useState<IUserDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const tokenData = localStorage.getItem('userSession');
        const parsedToken = tokenData ? JSON.parse(tokenData) : null;
        const token = parsedToken?.token;
        const userId = parsedToken?.user?.idUser; // Asegurarnos de obtener el ID

        if (!token || !userId) {
          throw new Error('No se encontró el usuario o el token');
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/datos/${userId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        setUser(data.Usuario);
      } catch (error) {
        console.error(error); //agrego para build
        setError('Error al cargar los datos del usuario');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prevUser) =>
      prevUser ? { ...prevUser, [e.target.name]: e.target.value } : null
    );
  };

  const handleSave = () => {
    toast(
      (t) => (
        <div className="text-center">
          <p className="font-medium">¿Seguro que quieres guardar los cambios?</p>
          <div className="flex justify-center gap-4 mt-2">
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                try {
                  const tokenData = localStorage.getItem('userSession');
                  const parsedToken = tokenData ? JSON.parse(tokenData) : null;
                  const token = parsedToken?.token;
                  const userId = parsedToken?.user?.idUser;

                  if (!token || !userId) {
                    throw new Error('No se encontró el usuario o el token');
                  }

                  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/datos/${userId}`, {
                    method: 'PATCH',
                    headers: {
                      Authorization: `Bearer ${token}`,
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(user),
                  });

                  if (!response.ok) {
                    throw new Error('No se pudieron guardar los cambios');
                  }

                  toast.success('Usuario actualizado correctamente');
                  router.push('/dashboard/user/perfil'); // Redirigir a la vista de perfil del usuario
                } catch (error) {
                  toast.error('Error al actualizar el usuario');
                  console.error('Error al actualizar el usuario', error);
                }
              }}
              className="bg-green-500 text-white px-3 py-1 rounded-md shadow-md hover:bg-green-700 transition"
            >
              Sí, guardar
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="bg-gray-500 text-white px-3 py-1 rounded-md shadow-md hover:bg-gray-700 transition"
            >
              Cancelar
            </button>
          </div>
        </div>
      ),
      { duration: Infinity }
    );
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  if (!user) return <p className="text-gray-500 text-center">No se encontró el usuario</p>;

  return (
    <div className="flex justify-center items-center min-h-screen">
  <div className="rounded-2xl p-8 max-w-lg w-full">
    <h1 className="text-3xl font-semibold text-center mb-6">Perfil de Usuario</h1>
    <div className="space-y-4">
      <label className="block">
        Nombre:
        <input
          type="text"
          name="nombre"
          value={user.nombre}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-lg border border-gray-300 p-2 focus:border-green-500 focus:ring focus:ring-green-300 transition"
        />
      </label>
      <label className="block">
        Apellido:
        <input
          type="text"
          name="apellido"
          value={user.apellido}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-lg border border-gray-300 p-2 focus:border-green-500 focus:ring focus:ring-green-300 transition"
        />
      </label>
      <label className="block">
        Email:
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-lg border border-gray-300 p-2 focus:border-green-500 focus:ring focus:ring-green-300 transition"
        />
      </label>
      <label className="block">
        DNI:
        <input
          type="text"
          name="dni"
          value={user.dni}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-lg border border-gray-300 p-2 focus:border-green-500 focus:ring focus:ring-green-300 transition"
        />
      </label>
      <label className="block">
        Teléfono:
        <input
          type="text"
          name="phoneNumber"
          value={user.phoneNumber}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-lg border border-gray-300 p-2 focus:border-green-500 focus:ring focus:ring-green-300 transition"
        />
      </label>
    
      <div className="flex justify-center mt-6 gap-4">
        <button
          onClick={handleSave}
          className="bg-green-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-700 transition-all"
        >
          Guardar cambios
        </button>
         </div>

        <p className="mt-4 text-center text-gray-600 text-sm">
           Si necesita cambiar más datos, por favor contáctese con Valle de Paz al
           <span className="font-semibold"> 0800-333-8255 </span> o por WhatsApp al
           <span className="font-semibold"> 1166569773</span>.
         </p>
        {/* <button
          onClick={() => router.back()}
          className="bg-gray-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-gray-700 transition-all"
        >
          Volver atrás
        </button> */}
    </div>
  </div>
</div>

  );
};

export default UserDatosView;
































// "use client";

// import { useAuth } from "@/context/AuthContext";
// import { useState } from "react";
// import { toast } from "react-hot-toast";

// const UserDatosView = () => {
//   const { userData, updateUser } = useAuth(); // Actualiza el contexto con los nuevos datos
//   const [formData, setFormData] = useState({
//     nombre: userData?.user?.nombre || "",
//     apellido: userData?.user?.apellido || "",
//     email: userData?.user?.email || "",
//     dni: userData?.user?.dni || "",
//     phoneNumber: userData?.user?.phoneNumber || "",
//   });
  
//   // Estados para controlar qué campos están habilitados para edición
//   const [editableFields, setEditableFields] = useState<{ [key: string]: boolean }>(
//     {
//       nombre: true,
//       apellido: true,
//       email: false,
//       dni: true,
//       phoneNumber: false,
//     }
//   );
  
//   const esGoogleUser =
//   userData?.user?.provider === "google" || !userData?.user?.apellido;
  
//   const camposNoEditables = ["phoneNumber", "email"];
  
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };
  
//   const handleEdit = (key: string) => {
//     setEditableFields((prev) => ({ ...prev, [key]: true }));
//   };
  
//   const handleSubmit = async () => {
//     console.log("Token:", userData?.token);
//     console.log("User ID:", userData?.user?.idUser);
//     console.log("Form Data:", formData);
    
//     try {
//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL}/user/datos/${userData?.user?.idUser}`,
//         {
//           method: "PATCH",
//           headers: {
//             Authorization: `Bearer ${userData?.token}`,
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(formData),
//         }
//       );
      
//       if (!response.ok) {
//         throw new Error("No se pudo actualizar el perfil.");
//       }
      
//       const updatedUser = await response.json();
//       console.log("Antes de updateUser:", userData?.user);
//       updateUser(updatedUser);
//       console.log("Después de updateUser:", userData?.user);

      
//       // 🔹 Actualizar formData con la nueva información del usuario
//       setFormData({
//         nombre: updatedUser.nombre || "",
//         apellido: updatedUser.apellido || "",
//         email: updatedUser.email || "",
//         dni: updatedUser.dni || "",
//         phoneNumber: updatedUser.phoneNumber || "",
//       });
      
//       toast.success("Perfil actualizado correctamente!");
//     } catch (error) {
//       console.error(error);
//       toast.error("Hubo un error al actualizar el perfil.");
//     }
//   };
  
//   return (
//     <div className="min-h-screen py-10 px-4 md:px-10">
//       <div className="max-w-4xl mx-auto p-6">
//         <h2 className="text-3xl font-semibold text-center mb-6">
//           Perfil de Usuario
//         </h2>

//         <div className="space-y-6">
//           {Object.entries(formData).map(([key, value]) => (
//             <div
//             key={key}
//             className="p-4 border rounded-lg bg-gray-50 shadow-sm relative"
//             >
//               <p className="text-gray-600 text-sm capitalize">{key}:</p>

//               <div className="flex items-center">
//                 <input
//                   type="text"
//                   name={key}
//                   value={value}
//                   onChange={handleChange}
//                   className={`w-full p-2 mt-1 border rounded-md text-gray-800 ${
//                     camposNoEditables.includes(key) ? "cursor-not-allowed bg-gray-100" : ""
//                   }`}
//                   disabled={!editableFields[key] || camposNoEditables.includes(key)}
//                   placeholder={`Ingrese su ${key}`}
//                   />
                  

//                 {!camposNoEditables.includes(key) && (
//                   <button
//                   onClick={() => handleEdit(key)}
//                   className="ml-3 px-3 py-1 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600"
//                   >
//                     Modificar
//                   </button>
//                 )}
//               </div>

//               {camposNoEditables.includes(key) && (
//                 <div
//                 className="absolute top-2 right-2 text-gray-400 text-xs bg-gray-200 px-2 py-1 rounded-md opacity-90 cursor-pointer"
//                 title="Para modificar este dato contactate con Valle de Paz"
//                 >
//                   🔒
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>

//         <button
//           onClick={handleSubmit}
//           className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold"
//           >
//           Guardar cambios
//         </button>

//         <p className="mt-4 text-center text-gray-600 text-sm">
//           Si necesita cambiar más datos, por favor contáctese con Valle de Paz al
//           <span className="font-semibold"> 0800-333-8255 </span> o por WhatsApp al
//           <span className="font-semibold"> 1166569773</span>.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default UserDatosView;


























//SIN FUNCION DE CAMBIAR DATOS..
// "use client";

// import { useAuth } from "@/context/AuthContext";

// const UserDatosView = () => {
//   const { userData } = useAuth();
  

//   // para detectar si el usuario inició sesión con Google ("provider" es opcional en la propiedad de user = IUserSession)
//   const esGoogleUser = userData?.user?.provider === "google" || !userData?.user?.apellido;

//   return (
//     <div className="min-h-screen py-10 px-4 md:px-10">
//       <div className="max-w-4xl mx-auto p-6">
//         <h2 className="text-3xl font-semibold text-center mb-6">
//           Perfil de Usuario
//         </h2>
  
//         <div className="space-y-6">
//           {esGoogleUser ? (
//             <>
//               <div className="p-4 border rounded-lg bg-gray-50 shadow-sm">
//                 <p className="text-gray-600 text-sm">Nombre y Apellido:</p>
//                 <p className="text-lg font-medium text-gray-800">
//                   {userData?.user?.nombre || "No disponible"}
//                 </p>
//               </div>
  
//               <div className="p-4 border rounded-lg bg-gray-50 shadow-sm">
//                 <p className="text-gray-600 text-sm">Email:</p>
//                 <p className="text-lg font-medium text-gray-800">
//                   {userData?.user?.email || "No disponible"}
//                 </p>
//               </div>

//               <div className="p-4 border rounded-lg bg-gray-50 shadow-sm">
//                 <p className="text-gray-600 text-sm">DNI:</p>
//                 <p className="text-lg font-medium text-gray-800">
//                   {userData?.user?.dni || "No disponible"}
//                 </p>
//               </div>

//               <div className="p-4 border rounded-lg bg-gray-50 shadow-sm">
//                 <p className="text-gray-600 text-sm">Numero de Contacto:</p>
//                 <p className="text-lg font-medium text-gray-800">
//                   {userData?.user?.phoneNumber || "No disponible"}
//                 </p>
//               </div>
//             </>
//           ) : (
//             <>
//               <div className="p-4 border rounded-lg bg-gray-50 shadow-sm">
//                 <p className="text-gray-600 text-sm">Nombre:</p>
//                 <p className="text-lg font-medium text-gray-800">
//                   {userData?.user?.nombre || "No disponible"}
//                 </p>
//               </div>
  
//               <div className="p-4 border rounded-lg bg-gray-50 shadow-sm">
//                 <p className="text-gray-600 text-sm">Apellido:</p>
//                 <p className="text-lg font-medium text-gray-800">
//                   {userData?.user?.apellido || "No disponible"}
//                 </p>
//               </div>
  
//               <div className="p-4 border rounded-lg bg-gray-50 shadow-sm">
//                 <p className="text-gray-600 text-sm">Email:</p>
//                 <p className="text-lg font-medium text-gray-800">
//                   {userData?.user?.email || "No disponible"}
//                 </p>
//               </div>

//               <div className="p-4 border rounded-lg bg-gray-50 shadow-sm">
//                 <p className="text-gray-600 text-sm">DNI:</p>
//                 <p className="text-lg font-medium text-gray-800">
//                   {userData?.user?.dni || "No disponible"}
//                 </p>
//               </div>

//               <div className="p-4 border rounded-lg bg-gray-50 shadow-sm">
//                 <p className="text-gray-600 text-sm">Numero de Contacto:</p>
//                 <p className="text-lg font-medium text-gray-800">
//                   {userData?.user?.phoneNumber || "No disponible"}
//                 </p>
//               </div>

//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }  

// export default UserDatosView;
