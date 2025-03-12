'use client'

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { IInhumados, IPublicacion } from '@/types/index';
import { useAuth } from '@/context/AuthContext'; 
import { Field, Form, Formik, FormikHelpers } from 'formik';
import toast from 'react-hot-toast';
// import { toast } from 'react-hot-toast';

export default function InhumadoDetail() {
  const { id } = useParams();
  const { userData } = useAuth();
  const [inhumado, setInhumado] = useState<IInhumados | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [publicaciones, setPublicaciones] = useState<IPublicacion[]>([]);

 // Mapeo de valles con sus ubicaciones de Google Maps
 const ubicacionesMap: Record<string, string> = {
  Cipreses: "https://maps.app.goo.gl/kQuQRr7XRJZWaJpH9?g_st=iw",
  Robles: "https://maps.app.goo.gl/pJdnoZHMSRHgCsuYA?g_st=iw",
  Nogales: "https://maps.app.goo.gl/AoA38hgxgcftJimS8?g_st=iw",
  Sauces: "https://maps.app.goo.gl/DWG9ycwPU4gWVj6G9?g_st=iw",
  Magnolias: "https://maps.app.goo.gl/wmSPizGr1v3rCb4w5?g_st=iw"
};

  useEffect(() => {
    if (id && userData?.token) fetchInhumado();
  }, [id, userData?.token]);

  useEffect(() => {
    if (inhumado?.nombre) fetchPublicaciones(inhumado.nombre);
  }, [inhumado]);

  const fetchInhumado = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/inhumados/${id}`, {
        headers: { 'Authorization': `Bearer ${userData?.token}` },
      });

      if (!response.ok) throw new Error('No se pudo obtener los detalles del inhumado');
      const data: IInhumados = await response.json();
      setInhumado(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Ocurrió un error desconocido');
    } finally {
      setLoading(false);
    }
  };

  const fetchPublicaciones = async (nombreInhumado: string) => {
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
  };
///

const handlePublicationSubmit = async ( values: { text: string; image: File | undefined },
  { resetForm }: FormikHelpers<{ text: string; image: File | undefined }>
) => {
   
    const mensajeConFirma = `${values.text}\n\n— ${userData?.user.nombre} ${userData?.user.apellido || ''}`.trim();


    const formData = new FormData();
    formData.append('mensaje', mensajeConFirma);
    formData.append('inhumadoId', inhumado?.id || '');
    formData.append('usuarioId', userData?.user.idUser || '');

    if (values.image) {
      formData.append('file', values.image);
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/publicaciones/addPublicacion`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${userData?.token}` },
        body: formData,
      });

      if (response.ok) {
        toast.success('Tu mensaje fue enviado y será publicado luego de la aprobación.');
        resetForm();
        fetchPublicaciones(inhumado?.nombre || '');
      } else {
        const errorData = await response.json();
        toast.error(errorData.message);
      }
    } catch (error) {
      toast.error('Ocurrió un error al enviar la publicación.');
      console.log(error);
      
    }
  };
//

  if (loading) return <p>Cargando detalles...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!inhumado) return <p>No se encontraron detalles para esta persona.</p>;

  return (
    <div
      className="min-h-screen bg-fixed bg-cover bg-center flex flex-col items-center justify-center p-8 sm:px-6 text-black relative"
      style={{ backgroundImage: 'url(/images/fondo.jpg)' }}
    >
      {/* Logo del Cementerio */}
      {/* <div className="absolute top-20 left-4">
        <img src="/images/logo.jpg" alt="Logo Cementerio" className="h-24 w-auto" />
      </div> */}

      <div className="max-w-3xl w-full mt-20 p-6 md:p-8 rounded-lg border border-gray-400 bg-white bg-opacity-90 shadow-xl flex flex-col md:flex-row items-center">
        {/* Imagen Representativa */}
        <div className="w-32 h-32 md:w-48 md:h-48 flex-shrink-0 overflow-hidden rounded-lg">
          <img src="/images/paloma2sinfondo.png" alt="Foto de la persona" className="w-full h-full object-cover" />
        </div>

        {/* Información de la persona */}
        <div className="md:ml-6 flex-1 text-center md:text-rigth">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">{`${inhumado.nombre} ${inhumado.apellido}`}</h2>
          <p className="text-lg text-black">Nacido el: <span className="text-gray-600">{inhumado.fnac}</span></p>
          <p className="text-lg text-black">Fallecido el: <span className="text-gray-600">{inhumado.ffal}</span></p>
          <p className="text-lg text-black">Valle: <span className="text-gray-600">{inhumado.valle}</span>, Sector: <span className="text-gray-800">{inhumado.sector}</span></p>
          <p className="text-lg text-black">Manzana: <span className="text-gray-600">{inhumado.manzana}</span>, Parcela: <span className="text-gray-800">{inhumado.parcela}</span></p>
        
        {/* Agregar enlace de Google Maps si el valle tiene una ubicación asignada */}
        
        {ubicacionesMap[inhumado.valle] && (   
    <a 
     href={ubicacionesMap[inhumado.valle]} 
     target="_blank" 
     rel="noopener noreferrer" 
     className="text-blue-500 underline mt-2">
     Ver ubicación en Google Maps 
    </a>          
        )}
        
        
        </div>
      </div>

      {/* Formulario para dejar mensaje */}
      <Formik initialValues={{ text: '', image: undefined as File | undefined }}  onSubmit={handlePublicationSubmit}>
      {({ setFieldValue }) => (
          <Form className="mt-6 w-full max-w-3xl flex flex-col items-center space-y-4">
            <Field
              as="textarea"
              name="text"
              className="w-full p-2 border rounded-lg text-center"
              placeholder="Escribe tu mensaje..."
              rows={3}
            />
           <div className="flex flex-col items-center space-y-3">
  {/* Input de Archivo */}
    <span className="text-lg text-white">Si queres podes agregarle una imagen o un recuerdo - Formatos: JPG, PNG</span>
  <label className="cursor-pointer bg-white hover:bg-green-300 text-white-700 font-normal py-1 px-4 rounded-lg transition duration-300 flex items-center gap-2">
     Cargar Imagen
    <input
      type="file"
      accept="image/*"
      className="hidden"
      onChange={(event) => setFieldValue('image', event.currentTarget.files?.[0])}
    />
  </label>
  <span className="text-md text-white">Formatos: JPG, PNG</span>
  

  {/* Botón Publicar */}
  <button
    type="submit"
    className="w-full max-w-xs px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition duration-300 transform hover:scale-105"
  >
    🕊️ Publicar
  </button>
</div>

          </Form>
        )}
      </Formik>

      {/* Publicaciones */}
     <div className="mt-6 w-full">
  <h3 className="text-2xl font-semibold text-center text-white">
    Publicaciones de {inhumado.nombre}
  </h3>

  {publicaciones.length === 0 ? (
    <p className="text-center text-white">Aún no hay mensajes para esta persona 🕊️.</p>
  ) : (
    <ul className="mt-4 space-y-4">
      {publicaciones.map((pub, index) => (
        <li key={index} className="p-4 border rounded-lg bg-white bg-opacity-80 shadow-md">
          {/* Contenedor flexible para organizar imagen + texto */}
          <div className="flex items-center gap-4">
            {/* Imagen (si existe) alineada a la izquierda */}
            {pub.imagen && (
              <img
                src={pub.imagen}
                alt="Imagen publicada"
                className="rounded-lg max-w-1/4 max-h-60 object-cover"
              />
            )}

            {/* Mensaje con tamaño más grande y flex-1 para ocupar el resto del espacio */}
            <p className="text-lg text-center text-gray-800 flex-1">{pub.mensaje}</p>
          </div>

          {/* Fecha alineada a la derecha */}
          <p className="text-sm text-gray-600 mt-2 text-center">
            {new Date(pub.fechaPublicacion).toLocaleDateString()}
          </p>
        </li>
      ))}
    </ul>
  )}
</div>


    </div>
  );
}
