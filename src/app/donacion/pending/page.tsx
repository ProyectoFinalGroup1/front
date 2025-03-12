'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Pending = () => {
    const router = useRouter();
    
      const handleBackToDashboard = () => {
        router.push('/dashboard/user');
      };


  return (
    <div
      className="min-h-screen bg-fixed bg-cover bg-center text-black flex items-center justify-center px-4 py-8 md:px-8"
      style={{ backgroundImage: 'url(/images/fondo9.png)' }}
    >
      <div className="bg-white bg-opacity-80 p-6 rounded-2xl shadow-lg text-center max-w-md">
        {/* Logo del cementerio */}
        <div className="flex justify-center mb-4">
          <Image
            src="/images/logo.jpg"
            alt="Logo del Cementerio"
            width={96}
            height={96}
            className="object-contain"
          />
        </div>
        <h1 className="text-xl font-bold text-gray-700">¡Tu donación está pendiente!</h1>
        <p className="text-gray-600 mt-2">
          Por favor, espera unos segundos para confirmar el estado de tu donación...
        </p>

        <button
          onClick={handleBackToDashboard}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
        >
          Volver
        </button>
      </div>
    </div>
  );
};

export default Pending;
