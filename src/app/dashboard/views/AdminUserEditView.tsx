"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { IUserDetails } from "@/types";

// Interface para el estado del usuario para manejar correctamente la conversión de tipo
interface UserState extends Omit<IUserDetails, 'fechaPago'> {
  fechaPago: string | null;
}

const AdminUserEditView = () => {
  const { userId } = useParams();
  const [user, setUser] = useState<UserState | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const tokenData = localStorage.getItem("userSession");
        const parsedToken = tokenData ? JSON.parse(tokenData) : null;
        const token = parsedToken?.token;

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/user/datos/${userId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        
        // Almacenar la fecha exactamente como viene de la API
        setUser({
          ...data.Usuario,
          fechaPago: data.Usuario.fechaPago || null
        });
      } catch {
        setError("Error al cargar los datos del usuario");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'fechaPago' && value) {
      // Convertir la fecha seleccionada al formato ISO sin ajuste de zona horaria
      const selectedDate = new Date(value + 'T00:00:00Z');
      const isoString = selectedDate.toISOString();
      
      setUser(prevUser => 
        prevUser ? { ...prevUser, [name]: isoString } : null
      );
    } else {
      setUser(prevUser => 
        prevUser ? { ...prevUser, [name]: value } : null
      );
    }
  };

  const handleSave = () => {
    toast(
      (t) => (
        <div className="text-center">
          <p className="font-medium">
            ¿Seguro que quieres guardar los cambios?
          </p>
          <div className="flex justify-center gap-4 mt-2">
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                try {
                  const tokenData = localStorage.getItem("userSession");
                  const parsedToken = tokenData ? JSON.parse(tokenData) : null;
                  const token = parsedToken?.token;

                  // Enviar los datos exactamente como están en el estado
                  const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/user/datos/${userId}`,
                    {
                      method: "PATCH",
                      headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify(user),
                    }
                  );

                  if (!response.ok) {
                    throw new Error("No se pudieron guardar los cambios");
                  }

                  toast.success("Usuario actualizado correctamente");
                  router.push(`/dashboard/admin/usuarios/detalle/${userId}`);
                } catch (error) {
                  toast.error("Error al actualizar el usuario");
                  console.error("Error al actualizar el usuario", error);
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

  const handleBack = () => {
    router.back();
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

  if (!user)
    return (
      <p className="text-gray-500 text-center">No se encontró el usuario</p>
    );

  // Formatear fecha para el input - esto es crítico para mostrar la fecha correcta
  const formatDateForInput = (dateString: string | null) => {
    if (!dateString) return "";
    
    try {
      // Crear fecha desde el string ISO
      const date = new Date(dateString);
      
      // Extraer año, mes y día en formato UTC para evitar cambios de zona horaria
      // Formato YYYY-MM-DD para el input tipo date
      return date.toISOString().split('T')[0];
    } catch (e) {
      console.error("Error formatting date:", e);
      return "";
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className=" shadow-lg rounded-2xl p-6 max-w-lg w-full">
        <h1 className="text-2xl font-bold text-center mb-4">Editar Usuario</h1>
        <div className="space-y-3">
          <label className="block mb-2">
            Nombre:
            <input
              type="text"
              name="nombre"
              value={user.nombre || ""}
              onChange={handleInputChange}
              className="border rounded w-full p-2"
            />
          </label>
          <label className="block mb-2">
            Apellido:
            <input
              type="text"
              name="apellido"
              value={user.apellido || ""}
              onChange={handleInputChange}
              className="border rounded w-full p-2"
            />
          </label>
          <label className="block mb-2">
            Email:
            <input
              type="email"
              name="email"
              value={user.email || ""}
              onChange={handleInputChange}
              className="border rounded w-full p-2"
            />
          </label>
          <label className="block mb-2">
            DNI:
            <input
              type="text"
              name="dni"
              value={user.dni || ""}
              onChange={handleInputChange}
              className="border rounded w-full p-2"
            />
          </label>
          <label className="block mb-2">
            Teléfono:
            <input
              type="text"
              name="phoneNumber"
              value={user.phoneNumber || ""}
              onChange={handleInputChange}
              className="border rounded w-full p-2"
            />
          </label>

          <label className="block mb-2">
            Fecha de pago:
            <input
              type="date"
              name="fechaPago" 
              value={formatDateForInput(user.fechaPago)}
              onChange={handleInputChange}
              className="border rounded w-full p-2"
            />
          </label>

          <div className="flex justify-center mt-4 gap-4">
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-6 py-2 rounded-xl hover:bg-green-700 transition-all"
            >
              Guardar cambios
            </button>
            <button
              onClick={handleBack}
              className="bg-gray-500 text-white px-6 py-2 rounded-xl hover:bg-gray-700 transition-all"
            >
              Volver atrás
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUserEditView;