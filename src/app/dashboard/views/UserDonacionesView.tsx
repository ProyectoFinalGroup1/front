'use client';
import React from 'react';

const UserDonacionesView = () => {

  const handleDonation = async () => {
    try {
      const response = await fetch('http://localhost:3000/mercadopago/donar', { //http://localhost:3000/mercadopago/donar
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'victor@mail.cl',  // traer desde token el mail de usuario logueado
          monto: 1,  // Especificar en pantalla monto de la donación
          nombreMostrar: 'Victor Espinoza', // traer desde el token username de usuario logueado
          mensajeAgradecimiento: 'Gracias por tu generosidad',
          mostrarEnMuro: true,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Redirigir al usuario al enlace de pago de Mercado Pago
        window.location.href = data.pagoInfo.init_point;
      } else {
        alert('Hubo un problema al generar el enlace de pago');
      }
    } catch (error) {
      console.error('Error al procesar la donación:', error);
      alert('Hubo un error al procesar tu donación');
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-100 flex items-center py-10 px-4 md:px-10">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6 w-full">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 text-center mb-4">
          Contribuye a un legado de amor
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Tu donación ayuda a mantener este espacio de memoria y paz. Agradecemos tu generosidad y apoyo.
        </p>
        
        {/* Opciones de donación */}
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg shadow flex justify-between items-center">
            <span className="text-gray-700">Donación única</span>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition"
                    onClick={handleDonation}>
              Donar
            </button>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow flex justify-between items-center">
            <span className="text-gray-700">Suscripción mensual</span>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition">
              Suscribirse
            </button>
          </div>
        </div>
        
        {/* Mensaje de agradecimiento */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">Cada contribución es un acto de amor. Gracias por tu apoyo.</p>
        </div>
      </div>
    </div>
  );
};

export default UserDonacionesView;
















// import React from 'react'

// const UserDonacionesView = () => {
//   return (
//     <div>Donaciones del Usuario </div>
//   )
// }

// export default UserDonacionesView