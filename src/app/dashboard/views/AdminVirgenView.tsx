'use client';
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";


const API_URL = process.env.NEXT_PUBLIC_API_URL;
const AdminVirgenView = () => {
    
  const { userData } = useAuth();
  
  // console.log("token de usuario", userData?.token);

    const [messages, setMessages] = useState<{id: string;
                                            texto: string;
                                            imagenUrl?: string;
                                            fechaPublicacion: string;
                                            estado: boolean;
                                            }[]>([]);
    
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
      }
      };

      if (userData?.user.idUser) {
      fetchMessages();
      }
  }, [userData?.user.idUser]);


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
        throw new Error("Error al actualizar el mensaje");
      }
    
      // Si la actualización en la BD fue exitosa, actualizamos el estado en el frontend
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
        msg.id === id ? { ...msg, estado: true } : msg
        )
      );
    } catch (error) {
      console.error("Error al actualizar el mensaje:", error);
    }
};


    return (
        <div>
            <h1>
                Aquí podés Aceptar mensajes pendientes o Eliminar mensajes que ya fueron aprobados
            </h1>

            <div className="w-full mt-4">
            {messages.map((msg) => (
              <div key={msg.id} className="p-3 rounded-lg shadow-md mb-2 text-center">
                {msg.estado ? (
                  <>
                    <p className={`text-gray-800 font-bold text-lg ${msg.estado ? '' : 'opacity-50'}`}>
                      {msg.texto}
                    </p>

                    {msg.imagenUrl && (
                      <div className="flex justify-center">
                        <img src={msg.imagenUrl} alt="Imagen del mensaje" className="mt-2 max-w-xs rounded-lg" />
                      </div>
                    )}

                    <p className="text-xs text-gray-500">
                    Mensaje de {userData?.user.nombre} {userData?.user.apellido}. {new Date(msg.fechaPublicacion).toLocaleString()}
                    </p>
                  </>
                ) : (
                  <div className="flex flex-row">
                    <div className="flex items-center">
                        <button onClick={() => handleAccept(msg.id)}>
                            ACEPTAR
                        </button>
                    </div>
                    <div>

                        <p className="text-gray-500 italic">
                            Plegaria pendiente de aprobación.
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                            Fecha de solicitud {new Date(msg.fechaPublicacion).toLocaleString()}
                        </p>
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