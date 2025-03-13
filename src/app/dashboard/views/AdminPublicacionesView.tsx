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

const AdminPublicacionesView = () => {
  const { userData } = useAuth(); 
  const [publicaciones, setPublicaciones] = useState<Publicacion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filtro, setFiltro] = useState<string>("pendientes");

  useEffect(() => {
    const fetchPublicaciones = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/publicaciones`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${userData?.token}`,
          },
        });

        if (!response.ok) {
          toast.error("Error al obtener las publicaciones");
          return;
          // throw new Error("Error al obtener las publicaciones");
        }

        const data = await response.json();
        console.log("Datos recibidos:", data);

        // Fusionar publicaciones en un solo array
        const publicacionesArray = [...(data.Aprobadas || []), ...(data.Pendientes || [])];
        setPublicaciones(publicacionesArray);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Ocurrió un error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchPublicaciones();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/publicaciones/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${userData?.token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al eliminar la publicación");
      }

      setPublicaciones((prev) => prev.filter((pub) => pub.id !== id));
toast.success("Publicación eliminada correctamente");
} catch (error) {
  console.error("Error al eliminar la publicación:", error);
  toast.error("Error al eliminar la publicación");
}

  };

  const handleApprove = async (id: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/publicaciones/${id}`, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${userData?.token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al aprobar la publicación");
      }

      setPublicaciones(prev =>
        prev.map(pub => (pub.id === id ? { ...pub, aprobada: true } : pub))
      );
      toast.success("Publicación aprobada correctamente");
    } catch (error) {
      console.error("Error al aprobar la publicación:", error);
      toast.error("Error al aprobar la publicación");
    }
  };

  const publicacionesFiltradas = publicaciones.filter(publicacion => {
    if (filtro === "aprobadas") return publicacion.aprobada;
    if (filtro === "pendientes") return !publicacion.aprobada;
    if (filtro === "aprobadas" && "pendientes") return !publicacion.aprobada && publicacion.aprobada;
    return true;
  });

  return (
    <div>
          <div className="flex justify-center items-center mb-6">
          <h1 className="text-2xl font-bold text-center mb-4">Publicaciones a Inhumados</h1>
          </div>
          <div className="flex justify-center items-center mb-6">
          <h2 className="text-lg font-bold text-center mb-4">Desde este panel vas a poder aceptar publicaciones pendientes o eliminarlas.</h2>
          </div>

        {loading && <p className="text-center text-gray-500">Cargando...</p>}
        {error && <p className="text-red-600 text-center">{error}</p>}

        <div className="flex justify-center gap-4 mb-6">
        <button
            onClick={() => setFiltro("todas")}
            className={`px-4 py-2 rounded-lg mx-2 ${filtro === "todas" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            Todos
          </button>

          <button
            onClick={() => setFiltro("aprobadas")}
            className={`px-4 py-2 rounded-lg mx-2 ${filtro === "aprobadas" ? "bg-green-500 text-white" : "bg-gray-200"}`}
          >
            Aprobados
          </button>

          <button
            onClick={() => setFiltro("pendientes")}
            className={`px-4 py-2 rounded-lg mx-2 ${filtro === "pendientes" ? "bg-yellow-500 text-white" : "bg-gray-200"}`}
          >
            Pendientes
          </button>
        </div>

        <div>
          {publicacionesFiltradas.length === 0 ? (
            <p className="text-center text-gray-400">No hay publicaciones en este estado.</p>
          ) : (
            <ul className="space-y-6 mt-6">
              {publicacionesFiltradas.map(publicacion => (
                <li key={publicacion.id} className="p-6 rounded-2xl shadow-lg">
                  <p className="text-lg font-semibold">{publicacion.mensaje}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Fecha: {new Date(publicacion.fechaPublicacion).toLocaleDateString()}
                  </p>
                  {publicacion.imagen && (
                    <img 
                      src={publicacion.imagen} 
                      alt="Imagen de la publicación" 
                      className="max-w-[25vw] h-auto mt-4 mx-auto rounded-lg shadow-sm" 
                    />
                  )}
                  <p className={`mt-4 text-sm font-semibold ${publicacion.aprobada ? 'text-green-600' : 'text-red-600'}`}>
                    Estado: {publicacion.aprobada ? 'Aprobada' : 'Pendiente'}
                  </p>
                  {!publicacion.aprobada && (
                    <button
                      onClick={() => handleApprove(publicacion.id)}
                      className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-300"
                    >
                      Aprobar
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(publicacion.id)}
                    className="mt-4 ml-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    
  );
};

export default AdminPublicacionesView;

























