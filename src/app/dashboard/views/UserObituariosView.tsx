'use client'; 
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

type Publicacion = {
  id: string;
  mensaje: string;
  imagen: string;
  fechaPublicacion: string;
  aprobada: boolean;
};

const UserPublicacionesView = () => {
  const { userData } = useAuth(); // Obtenemos los datos del usuario
  const [publicaciones, setPublicaciones] = useState<Publicacion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filtro, setFiltro] = useState<string>("todas"); // Para manejar el filtro (Aprobadas/Pendientes/Todas)
  const [paginaActual, setPaginaActual] = useState<number>(1);
  const [publicacionesPorPagina] = useState<number>(5); // Cantidad de publicaciones por página

  useEffect(() => {
    const fetchPublicaciones = async () => {
      try {
        if (userData?.user?.idUser) {
          const userId = userData?.user?.idUser;
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/publicaciones/misPublicaciones/${userId}`);
          if (!response.ok) {
            throw new Error("Error al obtener las publicaciones");
          }
          const data: Publicacion[] = await response.json();
          setPublicaciones(data);
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
      fetchPublicaciones();
    }
  }, [userData]);

  const publicacionesFiltradas = publicaciones.filter((publicacion) => {
    if (filtro === "aprobadas") return publicacion.aprobada;
    if (filtro === "pendientes") return !publicacion.aprobada;
    return true; // Devuelve todas si no hay filtro aplicado
  });

  // Lógica de paginado
  const indexUltimaPublicacion = paginaActual * publicacionesPorPagina;
  const indexPrimeraPublicacion = indexUltimaPublicacion - publicacionesPorPagina;
  const publicacionesActuales = publicacionesFiltradas.slice(indexPrimeraPublicacion, indexUltimaPublicacion);

  // Cambiar de página
  const cambiarPagina = (pagina: number) => {
    setPaginaActual(pagina);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8">
      <div className="max-w-4xl mx-auto bg-white shadow-xl p-6 w-full rounded-2xl">
        <h1 className="text-3xl font-semibold text-gray-800 text-center mb-6">
          Mis Publicaciones
        </h1>

        {loading && <p className="text-center text-gray-500">Cargando...</p>}
        {error && <p className="text-red-600 text-center">{error}</p>}

        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-4">
            <button
              onClick={() => setFiltro("todas")}
              className={`px-4 py-2 rounded-lg text-sm ${filtro === "todas" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            >
              Todas
            </button>
            <button
              onClick={() => setFiltro("aprobadas")}
              className={`px-4 py-2 rounded-lg text-sm ${filtro === "aprobadas" ? "bg-green-500 text-white" : "bg-gray-200"}`}
            >
              Aprobadas
            </button>
            <button
              onClick={() => setFiltro("pendientes")}
              className={`px-4 py-2 rounded-lg text-sm ${filtro === "pendientes" ? "bg-yellow-500 text-white" : "bg-gray-200"}`}
            >
              Pendientes
            </button>
          </div>
        </div>

        <div>
          {publicacionesActuales.length === 0 ? (
            <p className="text-center text-gray-400">No tienes publicaciones en este estado.</p>
          ) : (
            <ul className="space-y-6 mt-6">
              {publicacionesActuales.map((publicacion) => (
                <li key={publicacion.id} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
                  <p className="font-medium text-gray-800 text-lg">{publicacion.mensaje}</p>
                  <p className="text-sm text-gray-500 mt-2">{new Date(publicacion.fechaPublicacion).toLocaleDateString()}</p>
                  {publicacion.imagen && (
                    <img 
                      src={publicacion.imagen} 
                      alt="Imagen de la publicación" 
                      className="max-w-[25vw] h-auto mt-4 mx-auto rounded-lg shadow-sm" 
                    />
                  )}
                  <p className={`mt-4 text-sm font-semibold ${publicacion.aprobada ? 'text-green-600' : 'text-red-600'}`}>
                    {publicacion.aprobada ? 'Aprobada' : 'Pendiente de aprobación'}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Paginado */}
        <div className="flex justify-center space-x-4 mt-6">
          <button 
            onClick={() => cambiarPagina(paginaActual - 1)} 
            disabled={paginaActual === 1} 
            className="px-4 py-2 bg-gray-300 rounded-lg text-sm disabled:opacity-50"
          >
            Anterior
          </button>
          <button 
            onClick={() => cambiarPagina(paginaActual + 1)} 
            disabled={paginaActual * publicacionesPorPagina >= publicacionesFiltradas.length} 
            className="px-4 py-2 bg-gray-300 rounded-lg text-sm disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserPublicacionesView;



























//funciona pero no trae las publicaciones porque la respuesta del get /publicaciones no tiene la propiedad usuarioId
// 'use client'

// import { useEffect, useState } from 'react';
// import { useAuth } from '@/context/AuthContext';
// import { IPost } from '@/types/index';  // Asegúrate de que tienes esta interface para las publicaciones
// import { useRouter } from 'next/navigation';

// export default function MisPublicaciones() {
//   const { userData } = useAuth(); // Obtengo los datos del usuario desde el contexto
//   const [publicaciones, setPublicaciones] = useState<IPost[]>([]); // Arreglo para las publicaciones
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter(); // Para manejar navegación si es necesario

//   useEffect(() => {
//     if (!userData?.token) {
//       setError('No estás logueado. Por favor, inicia sesión.');
//       setLoading(false);
//       return;
//     }

//     const fetchPublicaciones = async () => {
//       try {
//         const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/publicaciones`, {
//           headers: {
//             'Authorization': `Bearer ${userData.token}`,
//           },
//         });

//         if (!response.ok) throw new Error('No se pudieron cargar las publicaciones.');
//         const responseData = await response.json();

//         // Accede a las publicaciones aprobadas y pendientes
//         const aprobadas = responseData.Aprobadas || [];
//         const pendientes = responseData.Pendientes || [];

//         // Combina las publicaciones
//         const todasPublicaciones = [...aprobadas, ...pendientes];

//         // Filtra las publicaciones por el usuario logueado
//         const publicacionesUsuario = todasPublicaciones.filter(publicacion => publicacion.usuarioId === userData.user.idUser);
//         setPublicaciones(publicacionesUsuario);
//       } catch (err: unknown) {
//         if (err instanceof Error) {
//           setError(err.message);
//         } else {
//           setError('Ocurrió un error desconocido.');
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPublicaciones();
//   }, [userData]);

//   if (loading) return <p>Cargando tus publicaciones...</p>;
//   if (error) return <p>Error: {error}</p>;

//   if (publicaciones.length === 0) return <p>No has publicado nada aún.</p>;

//   return (
//     <div className="min-h-screen bg-fixed bg-cover bg-center text-black flex flex-col items-center justify-center p-8" style={{ backgroundImage: 'url(/images/fondo.jpg)' }}>
//       <div className="max-w-3xl mx-auto mt-20 p-8 rounded-lg border-2 border-white bg-white bg-opacity-60 bg-fixed">
//         <h2 className="text-3xl font-semibold text-center text-gray-900 mb-4">Tus Publicaciones</h2>
//         <div className="space-y-4">
//           {publicaciones.map((publicacion) => (
//             <div key={publicacion.id} className="bg-gray-100 p-4 rounded-lg shadow-lg mb-4">
//               <h3 className="text-xl font-semibold">{publicacion.mensaje}</h3>
//               {publicacion.imagen && <img src={publicacion.imagen} alt="Imagen de la publicación" className="mt-2 max-w-full h-auto rounded-lg" />}
//               {/* <p className="mt-2 text-gray-600">Publicado el: {new Date(publicacion.fechaPublicacion).toLocaleDateString()}</p> */}
//               <div className="flex justify-between items-center mt-2">
//                 <button
//                   onClick={() => router.push(`/publicaciones/editar/${publicacion.id}`)}
//                   className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
//                 >
//                   Editar
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }





































//IMPLEMENTADO AYER
// 'use client';
// import { useEffect, useState } from "react";

// export default function UserObituariosView() {
//   const [publicaciones, setPublicaciones] = useState<any[]>([]);  // Aseguramos que publicaciones sea un array

//   useEffect(() => {
//     const fetchPublicaciones = async () => {
//       try {
//         const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/publicaciones`, {
//           method: "GET",
//           headers: {
//             "Accept": "application/json",
//           },
//           // credentials: "include",  // Asegúrate de tener los credentials si es necesario
//         });

//         if (!response.ok) {
//           throw new Error(`Error ${response.status}: ${response.statusText}`);
//         }

//         const data = await response.json();
//         console.log("🔍 Respuesta del backend:", data);

//         // Combinar las publicaciones aprobadas y pendientes
//         const publicacionesUsuario = [...data.Aprobadas, ...data.Pendientes];

//         // Filtrar solo las publicaciones que pertenecen al usuario logueado
//         // Aquí suponemos que tienes acceso al `userData` con el id del usuario
//         const storedUserData = typeof window !== 'undefined' ? localStorage.getItem("userSession") : null;
//         const userData = storedUserData ? JSON.parse(storedUserData) : null;

//         if (userData) {
//           const publicacionesFiltradas = publicacionesUsuario.filter(
//             (pub: any) => pub.usuarioId === userData.user.idUser
//           );
//           setPublicaciones(publicacionesFiltradas);
//         }

//       } catch (error) {
//         console.error("Error obteniendo publicaciones", error);
//       }
//     };

//     fetchPublicaciones();
//   }, []);

//   return (
//     <div className="p-4">
//       <h1 className="text-xl font-bold mb-4">Este es el historial de tus publicaciones</h1>

//       {/* Mostrar publicaciones */}
//       <div className="grid gap-4 mt-4">
//         {publicaciones.length > 0 ? (
//           publicaciones.map((pub: any) => {
//             const { mensaje, fechaPublicacion, imagen, id } = pub;
//             const fecha = new Date(fechaPublicacion);
//             const formattedDate = `${fecha.getDate().toString().padStart(2, '0')}/${(fecha.getMonth() + 1).toString().padStart(2, '0')}/${fecha.getFullYear()}`;

//             return (
//               <div key={id} className="border rounded p-4">
//                 <h2 className="text-lg font-semibold">Mensaje: {mensaje}</h2>
//                 <p className="text-gray-500">Fecha: {formattedDate}</p>
//                 {imagen && <img src={imagen} alt="Imagen de la publicación" className="w-full mt-2 rounded" />}
//               </div>
//             );
//           })
//         ) : (
//           <p>No tienes publicaciones.</p>
//         )}
//       </div>
//     </div>
//   );
// }

















// 'use client'
// import React, { useState } from 'react'; //agregar useEffect antes de useState
// // import axios from 'axios';
// import { IObituario, IInhumado } from '@/types/index'; 
// import MensajesForm from '@/app/dashboard/components/MensajesForm';

// const UserObituariosView = () => {
//   const [obituarios] = useState<IObituario[]>([]); //agregar setObituarios entre los corchetes (cuando siga)
//   const [inhumados] = useState<IInhumado[]>([]); //agregar setInhumados idem arriba(cuando siga)
//   // const [loading, setLoading] = useState(true);

//   // useEffect(() => {
//   //   const fetchInhumados = async () => {
//   //     try {
//   //       const userId = '123'; 
//   //       const inhumadosResponse = await axios.get(`/usuario-inhumado/usuario/${userId}`);
//   //       setInhumados(inhumadosResponse.data);

//   //       // Obtener los mensajes por el nombre del inhumado
//   //       const messagesPromises = inhumadosResponse.data.map(inhumado => 
//   //         axios.get(`/publicaciones/${inhumado.nombre}`)
//   //       );

//   //       // Esperar que todas las peticiones a las publicaciones se resuelvan
//   //       const messagesResponse = await Promise.all(messagesPromises);
//   //       const allMessages = messagesResponse.map(res => res.data);
        
//   //       // Guardamos los mensajes en el estado
//   //       setObituarios(allMessages.flat()); // Aplanamos el array de mensajes si es necesario
        
//   //     } catch (error) {
//   //       console.error('Error fetching data:', error);
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };

//   //   fetchInhumados();
//   // }, []);

//   // if (loading) return <div>Cargando...</div>;

//   return (
//     <div className="min-h-screen bg-white py-10 px-4 mt-6 md:px-10">
//       <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6">
//         <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 text-center mb-4">
//           Recuerdos de nuestros seres queridos
//         </h1>
//         <p className="text-gray-600 text-center mb-6">
//           Aquí puedes ver los mensajes que has dejado en memoria de tus seres queridos.
//         </p>

//         {/* Formulario para enviar mensajes */}
//         <MensajesForm/>

//         {/* Lista de mensajes */}
//         <div className="space-y-4 mt-6">
//           {obituarios.map((obituario) => {
//             const inhumado = inhumados.find(inhumado => String(inhumado.id) === obituario.inhumadoId);
//             return (
//               <div key={obituario.id} className="bg-white p-8 rounded-lg shadow">
//                 <p className="text-gray-700">`{obituario.mensaje}`</p>
//                 {inhumado && (
//                   <div>
//                     <span className="text-sm text-gray-500">- {inhumado.nombre} {inhumado.apellido}</span>
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserObituariosView;
