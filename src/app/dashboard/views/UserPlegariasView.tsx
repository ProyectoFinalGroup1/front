'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const UserPlegariasView = () => {
    const { userData } = useAuth();
    const [filter, setFilter] = useState<"all" | "approved" | "pending">("all");


    const [allMessagges, setAllMessagges] = useState<{
        id: string;
        texto: string;
        imagenUrl?: string;
        fechaPublicacion: string;
        estado: boolean;
        idUser: string;
    }[]>([]);

    useEffect(() => {
        const fetchAllMessagges = async () => {
            try {
                const response = await fetch(`${API_URL}/mensajesVirgen`, {
                    method: "GET"
                });
                if (!response.ok) {
                    const errorText = await response.text();    // Intenta leer el mensaje del backend
                    throw new Error(`Error al obtener los mensajes: ${errorText}`);
                }

                const data = await response.json();
                setAllMessagges(data);
                console.log(data);

            } catch (error) {
                console.error("Error en fetAllchMessages:", error);
            }
        };

        if (userData?.user.idUser) {
            fetchAllMessagges();
        }

    }, []);  // [userData?.user.idUser] Se volverá a montar cuando se loguee otro idUser


    //  const parsedTexto = JSON.parse(mensaje.texto);
    //  const texto = parsedTexto.texto;
    //  const usuarioId = parsedTexto.usuarioId;
    //  const estado = mensaje.estado;

    const getApprovedMessages = () => {
        return allMessagges.filter(msg => msg.estado);
    };
      
    const getPendingMessages = () => {
        return allMessagges.filter(msg => !msg.estado);
    };

    const getFilteredMessages = () => {
        if (filter === "approved") return getApprovedMessages();
        if (filter === "pending") return getPendingMessages();
        return allMessagges;
    };
      
    return (
        <div className="min-h-screen flex items-center justify-center py-8">
            <div className="max-w-4xl mx-auto p-6 w-full rounded-2xl">
                <h1 className="text-3xl font-semibold text-center mb-6">
                    Mis Plegarias
                </h1>
                
                <div className="flex justify-between items-center mb-6">
                    <div className="flex space-x-4">
                        <button onClick={() => setFilter("all")}
                                className={`px-4 py-2 rounded-lg text-sm ${filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
                            Todas
                        </button>

                        <button onClick={() => setFilter("approved")}
                                className={`px-4 py-2 rounded-lg text-sm ${filter === "approved" ? "bg-green-500 text-white" : "bg-gray-200"}`}>
                            Aprobadas
                        </button>

                        <button onClick={() => setFilter("pending")}
                                className={`px-4 py-2 rounded-lg text-sm ${filter === "pending" ? "bg-yellow-500 text-white" : "bg-gray-200"}`}>
                            Pendientes
                        </button>
                    </div>
                </div>
    
                <div>
                {getFilteredMessages().map((msg) => {
                    const parsedTexto = JSON.parse(msg.texto);
                    return (
                        <div key={msg.id} className="message-card">
                        <p><strong>Texto:</strong> {parsedTexto.texto}</p>
                        <p><strong>Usuario ID:</strong> {parsedTexto.usuarioId}</p>
                        <p><strong>Estado:</strong> {msg.estado ? "Aprobado" : "Pendiente"}</p>
                    </div>
                    );
                })}
                </div>

            </div>
      </div>
    );
};

export default UserPlegariasView;