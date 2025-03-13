'use client';
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";


const API_URL = process.env.NEXT_PUBLIC_API_URL;
const AdminVirgenView = () => {
    
  const { userData } = useAuth();
  
  // console.log("token de usuario", userData?.token);

    const [messages, setMessages] = useState<{id: string;
                                            texto: string;
                                            imagenUrl?: string;
                                            fechaPublicacion: string;
                                            estado: boolean;
                                            idUser: string;
                                            }[]>([]);

  const [filter, setFilter] = useState<"todos" | "aprobados" | "pendientes">("todos"); // Estado del filtro

    
  useEffect(() => {
      const fetchMessages = async () => {
      try {
          const response = await fetch(`${API_URL}/mensajesVirgen`, {
          method: "GET",
          headers: {
              Authorization: `Bearer ${userData?.token}`,
          },
          });

          if (!response.ok) {
          const errorText = await response.text();    // Intenta leer el mensaje del backend
          throw new Error(`Error al obtener los mensajes: ${errorText}`);
          }
          const data = await response.json();
          setMessages(data);
          console.log(data);

      } catch (error) {
          console.error("Error en fetchMessages:", error);
          toast.error("No se pudieron cargar las plegarias. Intentá recargando la página", {
                      position: "top-center",
                      duration: 5000
          })
      }
      };

      if (userData?.user.idUser) {
      fetchMessages();
      }
  }, [userData?.token, userData?.user.idUser]); //agrego [userData?.token] para build, REVISAR SI FUNCIONA


  const handleAccept = async(id: string) => {
    
    try {
      const response = await fetch(`${API_URL}/mensajesVirgen/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userData?.token}`,
        },
        body: JSON.stringify({  }),
      });
      if (!response.ok) {
        throw new Error("Error al aceptar el mensaje");
      }
    
      // Si la actualización en la BD fue exitosa, actualizamos el estado en el frontend
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
        msg.id === id ? { ...msg, estado: true } : msg
        )
      );
      toast.success("¡PLEGARIA APROBADA!, ahora es visible en el muro", {
                    position: "top-center",
                    duration: 5000
      })
    } catch (error) {
      console.error("Error al aceptar el mensaje:", error);
      toast.error("Ocurrió un ERROR al ACEPTAR el mensaje. Porfavor, revisá tu conexión", {
                  position: "top-center",
                  duration: 5000
      })
    }
  };

  const handleDelete = async(id: string) => {
    try {
      const response = await fetch(`${API_URL}/mensajesVirgen/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userData?.token}`,
        },
        body: JSON.stringify({  }),
      });
      if (!response.ok) {
        throw new Error("Error al eliminar el mensaje");
      }
    
      // Si la eliminación en la BD fue exitosa, actualizamos el estado en el frontend
      setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== id));
      toast.success("¡PLEGARIA ELIMINADA!", {
                    position: "top-center",
                    duration: 5000
      })
    
    } catch (error) {
      console.error("Error al eliminar el mensaje:", error);
      toast.error("Ocurrió un ERROR al ELIMINAR la plegaria. Porfavor, revisá tu conexión", {
                  position: "top-center",
                  duration: 5000
      })
    }
  }

  const isJsonString = (str: string) => {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      console.log(e);
      
      return false;
    }
  };

// Función para filtrar mensajes según el estado seleccionado
const filteredMessages = messages.filter((msg) => {
  if (filter === "aprobados") return msg.estado === true;
  if (filter === "pendientes") return msg.estado === false;
  return true; // "todos"
});

    return (
        <div>
          <div className="flex justify-center items-center mb-6">
          <h1 className="text-2xl font-bold text-center mb-4">Plegarias a la Virgen</h1>
          </div>
          <div className="flex justify-center items-center mb-6">
          <h2 className="text-lg font-bold text-center mb-4">Desde este panel vas a poder aceptar mensajes pendientes o eliminar mensajes.</h2>
          </div>
          {/* <div className="flex justify-center items-center mb-6">
          <h2 className="text-2xl font-bold text-center mb-4">aceptar mensajes pendientes o eliminar mensajes.</h2>
          </div> */}
       
        {/* Botones de filtro */}
<div className="flex justify-center gap-4 mb-6">
  <button
    onClick={() => setFilter("todos")}
    className={`px-4 py-2 rounded-lg font-bold transition-all ${filter === "todos" ? "bg-blue-500 text-white" : "bg-gray-300"}`}>
    Todos
  </button>
  <button
    onClick={() => setFilter("aprobados")}
    className={`px-4 py-2 rounded-lg font-bold transition-all ${filter === "aprobados" ? "bg-green-500 text-white" : "bg-gray-300"}`}>
    Aprobados
  </button>
  <button
    onClick={() => setFilter("pendientes")}
    className={`px-4 py-2 rounded-lg font-bold transition-all ${filter === "pendientes" ? "bg-yellow-500 text-white" : "bg-gray-300"}`}>
    Pendientes
  </button>
</div>

            <div className="w-full mt-4">
            {filteredMessages.map((msg) => (
              <div key={msg.id} className="mt-4 text-sm font-semibold text-red-600">
                
                {/* Etiqueta de estado */}
                <p className={`font-bold text-md text-center ${msg.estado ? 'text-green-500' : 'text-red-500'}`}> Estado: 
                   {msg.estado ? " Aprobado " : " Pendiente de aprobación "}
                </p>

                {/* Texto del mensaje */}
              
                  <p className="text-lg text-gray-500 font-bold
                                px-9 flex justify-start">
                    Mensaje:
                  </p>
                  <p className="text-gray-800 font-bold text-md
                                pl-9 flex justify-start">
                    {isJsonString(msg.texto) ? JSON.parse(msg.texto).texto : msg.texto}
                  </p>
                

                {/* Imagen si la tiene */}
                {msg.imagenUrl && (
                  <div className="flex justify-center">
                    <img src={msg.imagenUrl} alt="Imagen del mensaje" className="max-w-[25vw] h-auto mt-4 mx-auto rounded-lg shadow-sm" />
                  </div>
                )}

                {/* Información adicional */}
                <p className="text-sm text-gray-500 font-bold
                                px-9 flex justify-start">
                    Fecha: {new Date(msg.fechaPublicacion).toLocaleString()}</p>
                

                {/* Botones según el estado del mensaje */}
                  {/* Si el mensaje está pendiente */}
                  {!msg.estado && (
                    <div className="flex justify-center my-4">
                      <div>
                        <button onClick={() => handleAccept(msg.id)}
                                className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-300">
                          Aprobar
                        </button>
                        {/* <button className="bg-red-700 hover:bg-red-500 px-4 py-2 text-xs font-bold text-white rounded-xl transition-all duration-150">
                          RECHAZAR
                        </button> */}
                      </div>
                      
                      <div className="flex justify-end">
                        <button onClick={() => handleDelete(msg.id)}
                                className="mt-4 ml-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                          Eliminar
                        </button>
                      </div>
                    </div>
                  )}
                  {/* Si el mensaje ya fue aprobado*/}
                  {msg.estado && (
                    <div className="flex justify-around my-4">
                      {/* <div>
                        <button className="bg-red-700 hover:bg-red-500 px-4 py-2 text-xs font-bold text-white rounded-xl transition-all duration-150">
                          RECHAZAR
                        </button>
                      </div> */}
                      
                      <div>
                        <button onClick={() => handleDelete(msg.id)}
                                className="bg-red-700 hover:bg-red-500 px-4 py-2 text-xs font-bold text-white rounded-xl transition-all duration-150">
                          ELIMINAR
                        </button>
                      </div>
                    </div>
                  )}
              
              </div>
            ))}
          </div>


        </div>
    );
}

export default AdminVirgenView;