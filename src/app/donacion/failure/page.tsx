'use client';

import Image from 'next/image';
import Link from 'next/link';

const Failure = () => {
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
        <h1 className="text-xl font-bold text-gray-700">¡Ha ocurrido un error!</h1>
        <p className="text-gray-600 mt-2">Tu donación no se ha podido concretar, por favor intenta nuevamente.</p>
        {/* Botón para volver al dashboard */}
        <Link href="/dashboard/user/donaciones">
          <div className="mt-4 inline-block px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition">
            Volver
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Failure;
