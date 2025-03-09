'use client'

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { IInhumados } from '@/types/index';
import { useAuth } from '@/context/AuthContext'; 
import { Field, Form, Formik } from 'formik';

export default function InhumadoDetail() {
  const { id } = useParams(); // Uso useParams() para obtener el id de la URL
  const { userData } = useAuth(); // Obtengo los datos del usuario desde el contexto
  const [inhumado, setInhumado] = useState<IInhumados | null>(null);
  const [ error, setError] = useState<string | null>(null); 
  const [ loading, setLoading] = useState(true); 
    // const [newPublication, setNewPublication] = useState(''); //lo comento para build

  useEffect(() => {
    if (id && userData?.token) {
      const fetchData = async () => {
        const token = userData.token;
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const expirationDate = new Date(decodedToken.exp * 1000); // fecha de expiración del token

        console.log('Expiración del token:', expirationDate);

        if (expirationDate < new Date()) {
          setError('El token ha expirado. Por favor, vuelve a iniciar sesión.');
          setLoading(false);
          return;
        }
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/inhumados/${id}`, {
            headers: {
              'Authorization': `Bearer ${userData.token}`, // uso el token 
            },
          });
          if (!response.ok) throw new Error('No se pudo obtener los detalles del inhumado');
          const data: IInhumados = await response.json();
          setInhumado(data);
        } catch (err: unknown) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError('Ocurrió un error desconocido');
          }
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [id, userData?.token]); 

   const handlePublicationSubmit = async () => {
    //  if (newPublication.trim() === '') return;
    

  //   const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/publicaciones-addPublicaciones`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
        
  //       'Authorization': `Bearer ${userData?.token}`, // Incluir el token en la publicación
  //     },
  //     body: JSON.stringify({
  //       inhumadoId: inhumado?.id,
  //       contenido: newPublication,
  //     }),
  //   });

  //   if (response.ok) {
  //     // Reload the inhumado data to include the new publication
  //     const updatedInhumado = await response.json();
  //     setInhumado(updatedInhumado);
  //     setNewPublication('');
     }
  // };

    if (loading) return <p>Cargando detalles...</p>;
    if (error) return <p>Error: {error}</p>;

  if (!inhumado) return <p>No se encontraron detalles para este inhumado.</p>;

  return (
    <div className="min-h-screen bg-fixed bg-cover bg-center text-black flex flex-col items-center justify-center p-8" style={{ backgroundImage: 'url(/images/fondo.jpg)' }}>
   <div className="max-w-3xl mx-auto mt-20 p-8 rounded-lg border-2 border-white bg-white bg-opacity-60 bg-fixed">

      <h2 className="text-3xl font-semibold text-center text-gray-900 mb-4">{`${inhumado.nombre} ${inhumado.apellido}`}</h2>
      <div className="space-y-4 text-center">
        <p className="text-lg text-black">Nacido el: <span className="text-gray-600">{inhumado.fnac}</span></p>
        <p className="text-lg text-black">Fallecido el: <span className="text-gray-600">{inhumado.ffal}</span></p>
        <p className="text-lg text-black">Valle: <span className="text-gray-600">{inhumado.valle}</span>, Sector: <span className="text-gray-800">{inhumado.sector},</span></p>
        <p className="text-lg text-black"> Manzana: <span className="text-gray-600">{inhumado.manzana}</span>, Parcela: <span className="text-gray-800">{inhumado.parcela}</span></p>
        {/* <p className="text-lg text-gray-600">Símbolo: <span className="text-gray-800">{inhumado.simbolo}</span></p>
        <p className="text-lg text-gray-600">Cliente ID: <span className="text-gray-800">{inhumado.ncliente}</span></p> */}
      </div>
      </div>

      {/* Publicaciones Section */}
      {/* <div className="mt-6">
        <h3 className="text-2xl font-semibold text-white">Publicaciones</h3>
        {inhumado.publicaciones.length > 0 ? (
          <ul className="space-y-4 mt-4">
            {inhumado.publicaciones.map((pub, index) => (
              <li key={index} className="p-4 bg-gray-100 rounded-lg shadow-sm">
                <p className="text-white">{pub.contenido}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-white mt-2">No hay publicaciones disponibles.</p>
        )}
      </div> */}

      {/* Add Publication Section */}

      
       <Formik initialValues={{ text: '', image: undefined }} onSubmit={handlePublicationSubmit}>
                  {({ setFieldValue }) => (
                    <Form className="mb-4 flex flex-col items-center">
                      <Field as="textarea" name="text" className="w-full p-2 border rounded-lg text-center" placeholder="Escribe tu mensaje..." rows={3} />
                      <div className=" text-sm mt-2 flex flex-col items-center">
                        <input type="file" accept="image/*" className="p-2 text-white border rounded-lg" onChange={(event) => setFieldValue("image", event.currentTarget.files?.[0])} />
                        <span className=" text-sm text-white">(Opcional)</span>
                      </div>
                      <button type="submit" className="mt-2 px-4 py-2 bg-green-600 text-white rounded-lg">Publicar</button>
                    </Form>
                  )}
                </Formik>
    </div>
  );
}
