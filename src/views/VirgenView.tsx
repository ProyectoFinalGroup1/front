import React from 'react';

const VirgenView = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-400 text-black flex flex-col items-center justify-center p-8">
      <div className="bg-white bg-opacity-70 p-6 rounded-2xl shadow-lg max-w-2xl text-center">
        <h1 className="text-4xl font-bold text-fuchsia-600 mb-4">Mensajes a la Virgen de San Nicolás</h1>
        <p className="text-lg text-gray-800">
          Un espacio para dejar tus plegarias y pensamientos a la Virgen de San Nicolás. Comparte tus sentimientos y encuentra consuelo en la fe.
        </p>
      </div>
    </div>
  );
};

export default VirgenView;