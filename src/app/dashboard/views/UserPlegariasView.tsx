'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';
import WhatsAppButton from '@/components/WhatsappButton';

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

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const messagesPerPage = 5;
    const [editedMessages, setEditedMessages] = useState<{ [key: string]: string }>({});

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
                setError("Error al cargar las plegarias.");
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        if (userData?.user.idUser) {
            fetchAllMessagges();
        }

    }, [userData]);  

    // const getApprovedMessages = () => {
    //     return allMessagges.filter(msg => msg.estado);
    // };
      
    // const getPendingMessages = () => {
    //     return allMessagges.filter(msg => !msg.estado);
    // };

    const getFilteredMessages = () => {
        let filteredMessages = allMessagges;

        // Filtrar por estado
        if (filter === "approved") {
            filteredMessages = filteredMessages.filter(msg => msg.estado);
        } else if (filter === "pending") {
            filteredMessages = filteredMessages.filter(msg => !msg.estado);
        }
    
        // Filtrar por usuarioId dentro del texto
        if (userData?.user.idUser) {
            filteredMessages = filteredMessages.filter((msg) => {
                let parsedTexto;
                try {
                    parsedTexto = typeof msg.texto === "string" ? JSON.parse(msg.texto) : msg.texto;
                } catch {
                    parsedTexto = msg.texto; // Si falla el parseo, asumimos que ya es un string plano
                }
    
                return parsedTexto.usuarioId === userData.user.idUser;
            });
        }
    
        return filteredMessages;
    };
    
    
    

    const filteredMessages = getFilteredMessages();
    const totalPages = Math.ceil(filteredMessages.length / messagesPerPage);
    const displayedMessages = filteredMessages.slice((currentPage - 1) * messagesPerPage, currentPage * messagesPerPage);

    const handleEdit = async (id: string) => {
        // if (estado) {
        //     toast.error("Solo puedes editar plegarias pendientes.", {
        //         position: 'top-center',
        //     });
        //     return;
        // }
        
        try {
            // console.log("Editando plegaria con id:", id);
            // console.log("Nuevo texto:", editedMessages[id]);

            const response = await fetch(`${API_URL}/mensajesVirgen/editar/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json", 
                            "Authorization": `Bearer ${userData?.token}`
                },
                body: JSON.stringify({ texto: editedMessages[id] }),
                
            });

        if (!response.ok) {
            const errorText = await response.text(); // Captura el error del backend
            throw new Error(`Error al editar la plegaria: ${errorText}`);
        }

            setAllMessagges(prev => prev.map(msg => msg.id === id ? { ...msg, texto: editedMessages[id], estado: false } : msg));
            setEditedMessages(prev => ({ ...prev, [id]: "" }));
        } catch (error) {
            console.error("Error al editar la plegaria:", error);
            toast.error("No se pudo editar la plegaria.", {
                        position: 'top-center'
            });
        }
    };

      
    return (
        <div className="min-h-screen flex items-center justify-center py-8">
            <div className="max-w-4xl mx-auto p-6 w-full rounded-2xl">
                <h1 className="text-3xl font-semibold text-center mb-6">
                    Mis Plegarias
                </h1>

                {loading && <p className="text-center text-gray-500">Cargando...</p>}
                {error && <p className="text-red-600 text-center">{error}</p>}

                
                <div className="flex justify-center items-center mb-6">
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
    
                {/* Lista de mensajes */}
                {displayedMessages.length === 0 ? (
                    <p className="text-center text-gray-400">
                        No tienes publicaciones en este estado.
                    </p>
                ) : (
                    displayedMessages.map((msg) => {
                        // const parsedTexto = typeof msg.texto === "string" ? { texto: msg.texto } : JSON.parse(msg.texto);
                        let parsedTexto;
                            try {
                                parsedTexto = typeof msg.texto === "string" ? JSON.parse(msg.texto) : msg.texto;
                            } catch {
                                parsedTexto = msg.texto; // Si falla el parseo, asumimos que ya es un string plano
                            }
                        return (
                            <div key={msg.id} className="message-card p-4 rounded-lg shadow-md my-4">

                                {/* Edición */}
                                <textarea
                                    value={editedMessages[msg.id] ?? parsedTexto.texto}
                                    onChange={(e) => setEditedMessages(prev => ({ ...prev, [msg.id]: e.target.value }))}
                                    placeholder="Editar plegaria..."
                                    className="w-full border px-2 py-1 mt-2 rounded"
                                    disabled={msg.estado} // Deshabilita el textarea si el mensaje está aprobado
                                />
                                <p className={`mt-4 text-sm italic ${msg.estado ? '' : 'hidden'}`}>
                                    Si necesitás editar este mensaje contactate con Valle de Paz.
                                    <span className="inline-block ml-2"style={{ verticalAlign: '-3px' }}>
                                        <WhatsAppButton/>
                                    </span>
                                </p>

                                {/* Oculta botón si la plegaria ya está aprobada */}
                                {!msg.estado && (
                                    <button
                                        onClick={() => handleEdit(msg.id)}
                                        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                                        Guardar cambios
                                    </button>
                                )}
                                <p className="flex text-sm text-gray-500 mt-2">Fecha: {new Date(msg.fechaPublicacion).toLocaleDateString()}</p>
                                    {msg.imagenUrl && (
                                        <img 
                                        src={msg.imagenUrl} 
                                        alt="Imagen de la publicación" 
                                        className="max-w-[25vw] h-auto mt-4 mx-auto rounded-lg shadow-sm" 
                                        />
                                    )}
                                    <p className={`mt-4 text-sm font-semibold ${msg.estado ? 'text-green-600' : 'text-red-600'}`}>  
                                    Estado: {msg.estado ? 'Aprobada' : 'Pendiente de aprobación'}
                                </p>
                            </div>
                        );
                    })
                )}

                {/* Paginación */}
                <div className="flex justify-center mt-4 space-x-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
                        <button key={num}
                            onClick={() => setCurrentPage(num)}
                            className={`px-3 py-1 rounded-lg text-sm ${
                                num === currentPage ? "bg-blue-500 text-white" : "bg-gray-200"
                            }`}>
                            {num}
                        </button>
                    ))}
                </div>

            </div>
      </div>
    );
};

export default UserPlegariasView;