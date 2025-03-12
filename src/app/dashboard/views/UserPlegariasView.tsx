'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const UserPlegariasView = () => {
  const { userData } = useAuth();

  const [allMessagges, setAllMessagges] = useState<{id: string;
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

  return (
    <div></div>
  );
};

export default UserPlegariasView;