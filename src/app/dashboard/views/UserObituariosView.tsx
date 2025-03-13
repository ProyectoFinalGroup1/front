'use client'; 
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

type Publicacion = {
  id: string;
  mensaje: string;
  imagen: string;
  fechaPublicacion: string;
  aprobada: boolean;
};

const UserPublicacionesView = () => {
  const { userData } = useAuth(); 
  const [publicaciones, setPublicaciones] = useState<Publicacion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filtro, setFiltro] = useState<string>("todas"); // Para manejar el filtro (Aprobadas/Pendientes/Todas)
  const [paginaActual, setPaginaActual] = useState<number>(1);
  const [publicacionesPorPagina] = useState<number>(5); 
  const [mensajeEditado, setMensajeEditado] = useState<{ [key: string]: string }>({});
  const [edicionHabilitada, setEdicionHabilitada] = useState({});


  useEffect(() => {
    const fetchPublicaciones = async () => {
      try {
        if (userData?.user?.idUser) {
          const userId = userData?.user?.idUser;
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/publicaciones/misPublicaciones/${userId}`);
          if (!response.ok) {
            toast.error("No tenes publicaciones realizadas");
            return;
            // throw new Error("Error al obtener las publicaciones");
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

  const handleEdit = async (id: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/publicaciones/editar/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${userData?.token}`,
        },
        body: JSON.stringify({ mensaje: mensajeEditado[id] }),
      });

      if (!response.ok) {
        throw new Error("Error al editar la publicación");
      }

      const data = await response.json();
      alert(data.message);
      
      setPublicaciones((prev) => prev.map((pub) => pub.id === id ? { ...pub, mensaje: mensajeEditado[id], aprobada: false } : pub));
      setMensajeEditado((prev) => ({ ...prev, [id]: "" }));
    } catch (error) {
      console.error("Error al editar la publicación:", error);
      toast.error("Error al editar la publicación",);
    }
  };

  const publicacionesFiltradas = publicaciones.filter((publicacion) => {
    if (filtro === "aprobadas") return publicacion.aprobada;
    if (filtro === "pendientes") return !publicacion.aprobada;
    return true; 
  });

  const indexUltimaPublicacion = paginaActual * publicacionesPorPagina;
  const indexPrimeraPublicacion = indexUltimaPublicacion - publicacionesPorPagina;
  const publicacionesActuales = publicacionesFiltradas.slice(indexPrimeraPublicacion, indexUltimaPublicacion);

  const cambiarPagina = (pagina: number) => {
    setPaginaActual(pagina);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-8">
      <div className="max-w-4xl mx-auto p-6 w-full rounded-2xl">
        <h1 className="text-3xl font-semibold text-center mb-6">
          Mis Publicaciones
        </h1>

        {loading && <p className="text-center text-gray-500">Cargando...</p>}
        {error && <p className="text-red-600 text-center">{error}</p>}

        <div className="flex justify-center items-center mb-6">

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
                <li key={publicacion.id} className="p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
                  <p className="flex text-sm text-gray-500 mt-2">Fecha: {new Date(publicacion.fechaPublicacion).toLocaleDateString()}</p>
                  {publicacion.imagen && (
                    <img 
                    src={publicacion.imagen} 
                    alt="Imagen de la publicación" 
                    className="max-w-[25vw] h-auto mt-4 mx-auto rounded-lg shadow-sm" 
                    />
                  )}
                   
                   <p className={`mt-4 text-center text-sm font-semibold ${publicacion.aprobada ? 'text-green-600' : 'text-red-600'}`}>  
  Estado: {publicacion.aprobada ? 'Aprobada' : 'Pendiente de aprobación'}

  <label className="block text-left font-semibold mt-2">Publicación:</label>
  <textarea
    value={mensajeEditado[publicacion.id] ?? publicacion.mensaje}
    onChange={(e) => setMensajeEditado({ ...mensajeEditado, [publicacion.id]: e.target.value })}
    className="w-full border border-gray-300 rounded-md p-2 mt-2"
    disabled={!edicionHabilitada[publicacion.id]}
  />

  <div className="flex justify-center gap-2 mt-2">
    {!edicionHabilitada[publicacion.id] ? (
      <button
        onClick={() => setEdicionHabilitada({ ...edicionHabilitada, [publicacion.id]: true })}
        className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
      >
        Modificar
      </button>
    ) : (
      <>
        <button
          onClick={() => {
            setMensajeEditado({ ...mensajeEditado, [publicacion.id]: publicacion.mensaje });
            setEdicionHabilitada({ ...edicionHabilitada, [publicacion.id]: false });
          }}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Cancelar
        </button>

        <button
          onClick={() => {
            handleEdit(publicacion.id);
            setEdicionHabilitada({ ...edicionHabilitada, [publicacion.id]: false });
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Guardar Cambios
        </button>
      </>
    )}
  </div>
</p>

                </li>
              ))}
            </ul>
          )}
        </div>


                 {/* Paginado */}
         <div className="flex justify-center space-x-4 mt-6">           <button 
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





























// //ACTUAL FUNCIONANDO CON TODO CONECTADO SALVO EDITAR PUBLICACIONES
// 'use client'; 
// import React, { useEffect, useState } from "react";
// import { useAuth } from "@/context/AuthContext";

// type Publicacion = {
//   id: string;
//   mensaje: string;
//   imagen: string;
//   fechaPublicacion: string;
//   aprobada: boolean;
// };

// const UserPublicacionesView = () => {
//   const { userData } = useAuth(); 
//   const [publicaciones, setPublicaciones] = useState<Publicacion[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [filtro, setFiltro] = useState<string>("todas"); // Para manejar el filtro (Aprobadas/Pendientes/Todas)
//   const [paginaActual, setPaginaActual] = useState<number>(1);
//   const [publicacionesPorPagina] = useState<number>(5); 

//   useEffect(() => {
//     const fetchPublicaciones = async () => {
//       try {
//         if (userData?.user?.idUser) {
//           const userId = userData?.user?.idUser;
//           const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/publicaciones/misPublicaciones/${userId}`);
//           if (!response.ok) {
//             throw new Error("Error al obtener las publicaciones");
//           }
//           const data: Publicacion[] = await response.json();
//           setPublicaciones(data);
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
//       fetchPublicaciones();
//     }
//   }, [userData]);

//   const publicacionesFiltradas = publicaciones.filter((publicacion) => {
//     if (filtro === "aprobadas") return publicacion.aprobada;
//     if (filtro === "pendientes") return !publicacion.aprobada;
//     return true; 
//   });

  
//   const indexUltimaPublicacion = paginaActual * publicacionesPorPagina;
//   const indexPrimeraPublicacion = indexUltimaPublicacion - publicacionesPorPagina;
//   const publicacionesActuales = publicacionesFiltradas.slice(indexPrimeraPublicacion, indexUltimaPublicacion);

  
//   const cambiarPagina = (pagina: number) => {
//     setPaginaActual(pagina);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center py-8">
//       <div className="max-w-4xl mx-auto p-6 w-full rounded-2xl">
//         <h1 className="text-3xl font-semibold text-center mb-6">
//           Mis Publicaciones
//         </h1>

//         {loading && <p className="text-center text-gray-500">Cargando...</p>}
//         {error && <p className="text-red-600 text-center">{error}</p>}

//         <div className="flex justify-between items-center mb-6">
//           <div className="flex space-x-4">
//             <button
//               onClick={() => setFiltro("todas")}
//               className={`px-4 py-2 rounded-lg text-sm ${filtro === "todas" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
//             >
//               Todas
//             </button>
//             <button
//               onClick={() => setFiltro("aprobadas")}
//               className={`px-4 py-2 rounded-lg text-sm ${filtro === "aprobadas" ? "bg-green-500 text-white" : "bg-gray-200"}`}
//             >
//               Aprobadas
//             </button>
//             <button
//               onClick={() => setFiltro("pendientes")}
//               className={`px-4 py-2 rounded-lg text-sm ${filtro === "pendientes" ? "bg-yellow-500 text-white" : "bg-gray-200"}`}
//             >
//               Pendientes
//             </button>
//           </div>
//         </div>

//         <div>
//           {publicacionesActuales.length === 0 ? (
//             <p className="text-center text-gray-400">No tienes publicaciones en este estado.</p>
//           ) : (
//             <ul className="space-y-6 mt-6">
//               {publicacionesActuales.map((publicacion) => (
//                 <li key={publicacion.id} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
//                   <p className="flex font-medium text-gray-800 text-md"> Mensaje: {publicacion.mensaje}</p>
//                   <p className="flex text-sm text-gray-500 mt-2">Fecha: {new Date(publicacion.fechaPublicacion).toLocaleDateString()}</p>
//                   {publicacion.imagen && (
//                     <img 
//                       src={publicacion.imagen} 
//                       alt="Imagen de la publicación" 
//                       className="max-w-[25vw] h-auto mt-4 mx-auto rounded-lg shadow-sm" 
//                     />
//                   )}
//                   <p className={`mt-4 text-sm font-semibold ${publicacion.aprobada ? 'text-green-600' : 'text-red-600'}`}>  
//                   Estado: {publicacion.aprobada ? 'Aprobada' : 'Pendiente de aprobación'}
//                   </p>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>

//         {/* Paginado */}
//         <div className="flex justify-center space-x-4 mt-6">
//           <button 
//             onClick={() => cambiarPagina(paginaActual - 1)} 
//             disabled={paginaActual === 1} 
//             className="px-4 py-2 bg-gray-300 rounded-lg text-sm disabled:opacity-50"
//           >
//             Anterior
//           </button>
//           <button 
//             onClick={() => cambiarPagina(paginaActual + 1)} 
//             disabled={paginaActual * publicacionesPorPagina >= publicacionesFiltradas.length} 
//             className="px-4 py-2 bg-gray-300 rounded-lg text-sm disabled:opacity-50"
//           >
//             Siguiente
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserPublicacionesView;





















