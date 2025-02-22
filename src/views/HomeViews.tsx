'use client';

import InhumadosList from '@/components/InhumadosList';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Sección 1 */}
      <div 
        className="relative px-6 py-24 text-center min-h-screen flex items-center justify-center transition-opacity duration-1000 ease-in-out"
        style={{ 
          backgroundImage: "url('/images/fondo.jpg')", 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="max-w-2xl mx-auto bg-white bg-opacity-30 shadow-md rounded-xl p-6 backdrop-blur-sm">
          <p className="text-xl font-medium leading-relaxed text-gray-900">
            Un momento triste e inevitable nos hace sentir desamparados.
          </p>
          <p className="text-xl font-medium leading-relaxed text-gray-900 mt-2">
            Por eso en Valle de Paz contamos con servicio de atención durante las 24hs del día.
          </p>
          <span className="block text-2xl font-semibold text-blue-600 mt-4">
            Llamando al 0800-333-8255 (VALLE)
          </span>
        </div>
      </div>
      
      {/* Transición Suave */}
      <div className="h-16 bg-gradient-to-b from-transparent to-gray-100 opacity-50">
      <p className="text-xl text-center font-medium leading-relaxed p-2.5 text-gray-900">
      Cementerio Parque Valle de Paz - Ruta 2 Km 43 - La Plata, Buenos Aires
          </p>
      </div>
      
      {/* Sección 2 */}
      <div 
        className="relative px-6 py-24 text-center min-h-screen flex items-center justify-center transition-opacity duration-1000 ease-in-out"
        style={{ 
          backgroundImage: "url('/images/mural.png')", 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="max-w-2xl mx-auto bg-white bg-opacity-30 shadow-md rounded-xl p-6 backdrop-blur-sm">
          <p className="text-xl font-medium leading-relaxed text-gray-900">
            Otra sección con información adicional.
          </p>
        </div>
      </div>

      {/* Transición Suave */}
      <div className="h-16 bg-gradient-to-b from-transparent to-gray-100 opacity-50">
      <p className="text-xl text-center font-medium leading-relaxed p-2.5 text-gray-900">
      Cementerio Parque Valle de Paz - Ruta 2 Km 43 - La Plata, Buenos Aires
          </p>
      </div>
      
      {/* Sección 3 */}
      <div 
        className="relative px-6 py-24 text-center min-h-screen flex items-center justify-center transition-opacity duration-1000 ease-in-out"
        style={{ 
          backgroundImage: "url('/images/fondo.jpg')", 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="max-w-2xl mx-auto bg-white bg-opacity-30 shadow-md rounded-xl p-6 backdrop-blur-sm">
          <p className="text-xl font-medium leading-relaxed text-gray-900">
            Otra sección con información adicional.
          </p>
        </div>
      </div>
    </div>
  );
};
