'use client'
import React, { useState } from 'react'; //agregar useEffect antes de useState
// import axios from 'axios';
import { IObituario, IInhumado } from '@/types/index'; 
import MensajesForm from '@/app/dashboard/components/MensajesForm';

const UserObituariosView = () => {
  const [obituarios] = useState<IObituario[]>([]); //agregar setObituarios entre los corchetes (cuando siga)
  const [inhumados] = useState<IInhumado[]>([]); //agregar setInhumados idem arriba(cuando siga)
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchInhumados = async () => {
  //     try {
  //       const userId = '123'; 
  //       const inhumadosResponse = await axios.get(`/usuario-inhumado/usuario/${userId}`);
  //       setInhumados(inhumadosResponse.data);

  //       // Obtener los mensajes por el nombre del inhumado
  //       const messagesPromises = inhumadosResponse.data.map(inhumado => 
  //         axios.get(`/publicaciones/${inhumado.nombre}`)
  //       );

  //       // Esperar que todas las peticiones a las publicaciones se resuelvan
  //       const messagesResponse = await Promise.all(messagesPromises);
  //       const allMessages = messagesResponse.map(res => res.data);
        
  //       // Guardamos los mensajes en el estado
  //       setObituarios(allMessages.flat()); // Aplanamos el array de mensajes si es necesario
        
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchInhumados();
  // }, []);

  // if (loading) return <div>Cargando...</div>;

  return (
    <div className="min-h-screen bg-white py-10 px-4 mt-6 md:px-10">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 text-center mb-4">
          Recuerdos de nuestros seres queridos
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Aquí puedes ver los mensajes que has dejado en memoria de tus seres queridos.
        </p>

        {/* Formulario para enviar mensajes */}
        <MensajesForm/>

        {/* Lista de mensajes */}
        <div className="space-y-4 mt-6">
          {obituarios.map((obituario) => {
            const inhumado = inhumados.find(inhumado => String(inhumado.id) === obituario.inhumadoId);
            return (
              <div key={obituario.id} className="bg-white p-8 rounded-lg shadow">
                <p className="text-gray-700">`{obituario.mensaje}`</p>
                {inhumado && (
                  <div>
                    <span className="text-sm text-gray-500">- {inhumado.nombre} {inhumado.apellido}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UserObituariosView;
