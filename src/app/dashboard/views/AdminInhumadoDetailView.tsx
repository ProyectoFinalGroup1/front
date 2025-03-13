'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import toast from 'react-hot-toast';

interface Inhumado {
  id: string;
  nombre: string;
  apellido: string;
  fnac: string;
  ffal: string;
  valle: string;
  sector: string;
  manzana: string;
  parcela: string;
  simbolo: string;
  ncliente: string;
  imagenUrl: string;
  publicaciones?: Array<{
    id: string;
    titulo: string;
    contenido: string;
    fecha: string;
    aprobada: boolean;
  }>;
}

export default function DetalleInhumado({ params }: { params: { inhumadoId: string } }) {
  const { inhumadoId } = params;
  const [inhumado, setInhumado] = useState<Inhumado | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchInhumado = async () => {
      try {
        console.log("Obteniendo inhumado con ID:", inhumadoId);
        
        const tokenData = localStorage.getItem('userSession');
        const parsedToken = tokenData ? JSON.parse(tokenData) : null;
        const token = parsedToken?.token;
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/inhumados/${inhumadoId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
        
        console.log("Respuesta:", response.status, response.statusText);
        
        if (!response.ok) {
          throw new Error(`Error ${response.status}: No se pudo obtener la información del inhumado`);
        }
        
        const data = await response.json();
        console.log("Datos recibidos:", data);
        
        // Verificar si la respuesta tiene la estructura esperada
        if (!data || !data.id) {
          console.error("Formato de datos incorrecto:", data);
          throw new Error("Los datos recibidos no tienen el formato esperado");
        }
        
        setInhumado(data);
      } catch (err) {
        console.error("Error completo:", err);
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    if (inhumadoId) {
      fetchInhumado();
    } else {
      setError("ID de inhumado no proporcionado");
      setLoading(false);
    }
  }, [inhumadoId]);

  const handleDelete = async (id: string) => {
    const confirmed = await new Promise<boolean>((resolve) => {
       toast((t) => (
        <div>
          <p style={{ marginBottom: '10px', fontSize: '16px', fontWeight: 'bold' }}>
            ¿Está seguro que desea eliminar este inhumado?
          </p>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
            <button
              onClick={() => {
                toast.dismiss(t.id);
                resolve(true);
              }}
              style={{
                backgroundColor: 'green', color: 'white', padding: '10px 20px', borderRadius: '5px',
              }}
            >
              Sí
            </button>
            <button
              onClick={() => {
                toast.dismiss(t.id);
                resolve(false);
              }}
              style={{
                backgroundColor: 'red', color: 'white', padding: '10px 20px', borderRadius: '5px',
              }}
            >
              No
            </button>
          </div>
        </div>
      ));
    });
  
    if (!confirmed) return;
  
    try {
      const tokenData = localStorage.getItem('userSession');
      const parsedToken = tokenData ? JSON.parse(tokenData) : null;
      const token = parsedToken?.token;
  
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/inhumados/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al eliminar el inhumado');
      }
  
      toast.success('Inhumado eliminado con éxito.');
  
      setTimeout(() => {
        router.push('/dashboard/admin/inhumados');
      }, 1000);
  
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Error al eliminar el inhumado');
    }
  };
  
  // Estados de carga y error
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-bold mb-2">Error</h2>
          <p>{error}</p>
        </div>
        <button 
          onClick={() => router.back()}
          className="bg-gray-600 hover:bg-gray-700 text-white py-3 px-6 rounded-lg shadow-md transition duration-200 flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver
        </button>
      </div>
    );
  }

  if (!inhumado) {
    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <div className="bg-yellow-50 border-l-4 border-yellow-500 text-yellow-700 p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-bold mb-2">No encontrado</h2>
          <p>No se encontró información del inhumado</p>
        </div>
        <button 
          onClick={() => router.back()}
          className="bg-gray-600 hover:bg-gray-700 text-white py-3 px-6 rounded-lg shadow-md transition duration-200 flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b py-10 px-4">
      <div className="max-w-5xl mx-auto m-16">
        {/* Cabecera con nombre y acciones rápidas */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-4">
          <div className="bg-green-600 px-6 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-white">
                {inhumado.nombre} {inhumado.apellido}
              </h1>
              <span className="bg-white text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                #{inhumado.ncliente || 'N/A'}
              </span>
            </div>
          </div>
          
       
        </div>
        
        {/* Contenido principal en grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Columna izquierda: Imagen */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-gray-800 px-4 py-3">
                <h2 className="text-lg font-semibold text-white">Fotografía</h2>
              </div>
              <div className="p-4">
                {inhumado.imagenUrl ? (
                  <div className="flex justify-center">
                    <div className="relative w-full pt-[75%]">
                      <Image
                        src={inhumado.imagenUrl}
                        alt={`${inhumado.nombre} ${inhumado.apellido}`}
                        fill
                        className="object-cover rounded-lg absolute top-0 left-0"
                        unoptimized
                      />
                    </div>
                  </div>
                ) : (
                  <div className="h-64 flex items-center justify-center bg-gray-100 rounded-lg">
                    <p className="text-gray-500">Sin imagen</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Columna derecha: Información y ubicación */}
          <div className="md:col-span-2 space-y-8">
            {/* Tarjeta de información personal */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-blue-600 px-4 py-3">
                <h2 className="text-lg font-semibold text-white">Información Personal</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Fecha de Nacimiento</p>
                      <p className="font-medium flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {inhumado.fnac || 'No especificada'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Fecha de Fallecimiento</p>
                      <p className="font-medium flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {inhumado.ffal || 'No especificada'}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Símbolo</p>
                      <p className="font-medium flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        {inhumado.simbolo || 'No especificado'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Número de Cliente</p>
                      <p className="font-medium flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        {inhumado.ncliente || 'No especificado'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Tarjeta de ubicación */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-amber-600 px-4 py-3">
                <h2 className="text-lg font-semibold text-white">Ubicación</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Valle</p>
                      <p className="font-medium flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {inhumado.valle || 'No especificado'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Sector</p>
                      <p className="font-medium flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                        </svg>
                        {inhumado.sector || 'No especificado'}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Manzana</p>
                      <p className="font-medium flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        {inhumado.manzana || 'No especificada'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Parcela</p>
                      <p className="font-medium flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                        </svg>
                        {inhumado.parcela || 'No especificada'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
    
        
        {/* Botones de acción */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link 
            href={`/dashboard/admin/inhumados/editar/${inhumado.id}`}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md transition duration-200 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            Editar
          </Link>
          <button 
            onClick={() => handleDelete(inhumado.id)}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg shadow-md transition duration-200 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Eliminar
          </button>
          <button
            onClick={() => router.push('/dashboard/admin/inhumados')}
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg shadow-md transition duration-200 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver a la lista
          </button>
        </div>
      </div>
    </div>
  );
}