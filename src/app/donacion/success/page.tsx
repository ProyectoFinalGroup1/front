'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Success = () => {
  const router = useRouter();

  const handleBackToDashboard = () => {
    router.push('/dashboard/user');
  };

  return (
    <div className="min-h-screen bg-fixed bg-cover bg-center text-black flex flex-col items-center justify-center px-4 py-8 md:px-8"
      style={{ backgroundImage: 'url(/images/fondo9.png)' }}>

    <div className="flex items-center justify-center min-h-screen">
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
        <h1 className="text-xl font-bold text-gray-700">¡Gracias por tu donación!</h1>
        <p className="text-gray-600 mt-2">Tu apoyo es fundamental para </p>
        <p className="text-gray-600 mt-2"> mejorar nuestra capilla</p>
        
        <button
          onClick={handleBackToDashboard}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
        >
          Volver
        </button>
      </div>
    </div>
    </div>
  );
};

export default Success;
