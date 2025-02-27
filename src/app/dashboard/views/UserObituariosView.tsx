import React from 'react';

const UserObituariosView = () => {
  return (
    <div className="min-h-screen bg-white py-10 px-4 mt-6 md:px-10">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 text-center mb-4">
          Recuerdos de nuestros seres queridos
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Aquí puedes ver los mensajes que han dejado en memoria de tus seres queridos. Comparte tus recuerdos y deja unas palabras en su honor.
        </p>
        
        {/* Lista de mensajes */}
        <div className="space-y-4">
          <div className="bg-white p-8 rounded-lg shadow">
            <p className="text-gray-700">'Siempre estarás en nuestros corazones.'</p>
            <span className="text-sm text-gray-500">- Familia Pérez</span>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-gray-700">'Te extrañamos cada día'</p>
            <span className="text-sm text-gray-500">- Juan y Ana</span>
          </div>
        </div>
        
        {/* /* Botón para dejar un mensaje */
        /* <div className="mt-10 text-center">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition">
            Dejar un mensaje
          </button> */
        /* </div> */}
      </div> 
    </div>
  );
};

export default UserObituariosView;
