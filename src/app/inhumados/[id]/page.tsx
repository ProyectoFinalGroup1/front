'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { IInhumados, IPublicacion } from '@/types/index';
import { useAuth } from '@/context/AuthContext'; 
// import { Field, Form, Formik, FormikHelpers } from 'formik';
// import { toast } from 'react-hot-toast';
import Image from 'next/image';

export default function InhumadoDetail() {
  const { id } = useParams();
  const { userData } = useAuth();
  const [inhumado, setInhumado] = useState<IInhumados | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [publicaciones, setPublicaciones] = useState<IPublicacion[]>([]);

  const fetchInhumado = useCallback(async () => {
    if (!id || !userData?.token) return;
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/inhumados/${id}`, {
        headers: { 'Authorization': `Bearer ${userData.token}` },
      });
      if (!response.ok) throw new Error('No se pudo obtener los detalles del inhumado');
      const data: IInhumados = await response.json();
      setInhumado(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Ocurrió un error desconocido');
    } finally {
      setLoading(false);
    }
  }, [id, userData?.token]);

  useEffect(() => {
    fetchInhumado();
  }, [fetchInhumado]);

  const fetchPublicaciones = useCallback(async (nombreInhumado: string) => {
    if (!nombreInhumado) return;
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/publicaciones/${nombreInhumado}`, {
        headers: { 'Authorization': `Bearer ${userData?.token}` },
      });
      if (!response.ok) throw new Error('Error al obtener publicaciones');
      const data = await response.json();
      setPublicaciones(data);
    } catch (err) {
      console.error('Error:', err);
    }
  }, [userData?.token]);

  useEffect(() => {
    if (inhumado?.nombre) {
      fetchPublicaciones(inhumado.nombre);
    }
  }, [inhumado, fetchPublicaciones]);

  if (loading) return <p>Cargando detalles...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!inhumado) return <p>No se encontraron detalles para esta persona.</p>;

  return (
    <div className="min-h-screen bg-fixed bg-cover bg-center text-black flex flex-col items-center justify-center p-8" style={{ backgroundImage: 'url(/images/fondo.jpg)' }}>
      <div className="max-w-3xl mx-auto mt-20 p-8 rounded-lg border-2 border-white bg-white bg-opacity-60 bg-fixed">
        <h2 className="text-3xl font-semibold text-center text-gray-900 mb-4">{`${inhumado.nombre} ${inhumado.apellido}`}</h2>
        <div className="space-y-4 text-center">
          <p className="text-lg text-black">Nacido el: <span className="text-gray-600">{inhumado.fnac}</span></p>
          <p className="text-lg text-black">Fallecido el: <span className="text-gray-600">{inhumado.ffal}</span></p>
          <p className="text-lg text-black">Valle: <span className="text-gray-600">{inhumado.valle}</span>, Sector: <span className="text-gray-800">{inhumado.sector}</span></p>
          <p className="text-lg text-black">Manzana: <span className="text-gray-600">{inhumado.manzana}</span>, Parcela: <span className="text-gray-800">{inhumado.parcela}</span></p>
          <div className="mt-6 w-full">
            <h3 className="text-xl font-semibold text-center text-gray-900">Publicaciones de {inhumado.nombre}</h3>
            {publicaciones.length === 0 ? (
              <p className="text-center text-gray-600">Aún no hay mensajes para esta persona 🕊️.</p>
            ) : (
              <ul className="mt-4 space-y-4">
                {publicaciones.map((pub, index) => (
                  <li key={index} className="p-4 border rounded-lg bg-white shadow">
                    <p className="text-gray-800">{pub.mensaje}</p>
                    {pub.imagen && (
                      <Image src={pub.imagen} alt="Imagen publicada" width={400} height={300} className="mt-2 rounded-lg w-full max-h-72 object-cover" />
                    )}
                    <p className="text-sm text-gray-600 mt-2">Fecha: {new Date(pub.fechaPublicacion).toLocaleDateString()}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}




















//FUNCIONANDO PERO NO ME DEJA HACER BUILD
//  'use client'

// import { useEffect, useState } from 'react';
// import { useParams } from 'next/navigation';
// import { IInhumados, IPublicacion } from '@/types/index';
// import { useAuth } from '@/context/AuthContext'; 
// import { Field, Form, Formik, FormikHelpers } from 'formik';
// import { toast } from 'react-hot-toast';

// export default function InhumadoDetail() {
//   const { id } = useParams();
//   const { userData } = useAuth();
//   const [inhumado, setInhumado] = useState<IInhumados | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [publicaciones, setPublicaciones] = useState<IPublicacion[]>([]);

//   useEffect(() => {
//     if (id && userData?.token) {
//       fetchInhumado();
      
//     }
//   }, [id, userData?.token]);

//   useEffect(() => {
//     if (inhumado?.nombre) {
//       fetchPublicaciones(inhumado.nombre);
//     } 
//   }, [inhumado]);

//   const fetchInhumado = async () => {
//     try {
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/inhumados/${id}`, {
//         headers: { 'Authorization': `Bearer ${userData?.token}` },
//       });

//       if (!response.ok) throw new Error('No se pudo obtener los detalles del inhumado');
//       const data: IInhumados = await response.json();
//       setInhumado(data);
//     } catch (err: unknown) {
//       setError(err instanceof Error ? err.message : 'Ocurrió un error desconocido');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchPublicaciones = async (nombreInhumado: string) => {
//     try {
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/publicaciones/${nombreInhumado}`, {
//         headers: { 'Authorization': `Bearer ${userData?.token}` },
//       });

//       if (!response.ok) throw new Error('Error al obtener publicaciones');
//       const data = await response.json();
//       setPublicaciones(data);
//     } catch (err) {
//       console.error('Error:', err);
//     }
//   };

//   const handlePublicationSubmit = async ( values: { text: string; image: File | undefined },
//   { resetForm }: FormikHelpers<{ text: string; image: File | undefined }>
// ) => {
   
//     const mensajeConFirma = `${values.text}\n\n— ${userData?.user.nombre} ${userData?.user.apellido || ''}`.trim();


//     const formData = new FormData();
//     formData.append('mensaje', mensajeConFirma);
//     formData.append('inhumadoId', inhumado?.id || '');
//     formData.append('usuarioId', userData?.user.idUser || '');

//     if (values.image) {
//       formData.append('file', values.image);
//     }

//     try {
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/publicaciones/addPublicacion`, {
//         method: 'POST',
//         headers: { 'Authorization': `Bearer ${userData?.token}` },
//         body: formData,
//       });

//       if (response.ok) {
//         toast.success('Tu mensaje fue enviado y será publicado luego de la aprobación.');
//         resetForm();
//         fetchPublicaciones(inhumado?.nombre || '');
//       } else {
//         const errorData = await response.json();
//         toast.error(errorData.message);
//       }
//     } catch (error) {
//       toast.error('Ocurrió un error al enviar la publicación.');
//       console.log(error);
      
//     }
//   };

//   if (loading) return <p>Cargando detalles...</p>;
//   if (error) return <p>Error: {error}</p>;
//   if (!inhumado) return <p>No se encontraron detalles para esta persona.</p>;

//   return (
//     <div className="min-h-screen bg-fixed bg-cover bg-center text-black flex flex-col items-center justify-center p-8" style={{ backgroundImage: 'url(/images/fondo.jpg)' }}>
//       <div className="max-w-3xl mx-auto mt-20 p-8 rounded-lg border-2 border-white bg-white bg-opacity-60 bg-fixed">
//         <h2 className="text-3xl font-semibold text-center text-gray-900 mb-4">{`${inhumado.nombre} ${inhumado.apellido}`}</h2>
//         <div className="space-y-4 text-center">
//           <p className="text-lg text-black">Nacido el: <span className="text-gray-600">{inhumado.fnac}</span></p>
//           <p className="text-lg text-black">Fallecido el: <span className="text-gray-600">{inhumado.ffal}</span></p>
//           <p className="text-lg text-black">Valle: <span className="text-gray-600">{inhumado.valle}</span>, Sector: <span className="text-gray-800">{inhumado.sector}</span></p>
//           <p className="text-lg text-black">Manzana: <span className="text-gray-600">{inhumado.manzana}</span>, Parcela: <span className="text-gray-800">{inhumado.parcela}</span></p>

//           <Formik initialValues={{ text: '', image: undefined as File | undefined }}  onSubmit={handlePublicationSubmit}>
//    {({ setFieldValue }) => (
//               <Form className="mb-4 flex flex-col items-center">
//                 <Field 
//                   as="textarea" 
//                   name="text" 
//                   className="w-full p-2 border rounded-lg text-center" 
//                   placeholder="Escribe tu mensaje..." 
//                   rows={3}
//                 />
//                 <div className="text-sm mt-2 flex flex-col items-center">
//                   <input 
//                     type="file" 
//                     accept="image/*" 
//                     className="p-2 text-white border rounded-lg" 
//                     onChange={(event) => setFieldValue("image", event.currentTarget.files?.[0])}
//                   />
//                   <span className="text-sm text-white">(Opcional)</span>
//                 </div>
//                 <button type="submit" className="mt-2 px-4 py-2 bg-green-600 text-white rounded-lg">Publicar</button>
//               </Form>
//             )}
//           </Formik>

//           <div className="mt-6 w-full">
//             <h3 className="text-xl font-semibold text-center text-gray-900">Publicaciones de {inhumado.nombre}</h3>
//             {publicaciones.length === 0 ? (
//               <p className="text-center text-gray-600">Aún no hay mensajes para esta persona 🕊️.</p>
//             ) : (
//               <ul className="mt-4 space-y-4">
//                 {publicaciones.map((pub, index) => (
//                   <li key={index} className="p-4 border rounded-lg bg-white shadow">
//                     <p className="text-gray-800">{pub.mensaje}</p>
//                     {pub.imagen && <img src={pub.imagen} alt="Imagen publicada" className="mt-2 rounded-lg w-full max-h-72 object-cover" />}
//                     <p className="text-sm text-gray-600 mt-2">Fecha: {new Date(pub.fechaPublicacion).toLocaleDateString()}</p>

//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }