'use client';

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col">
      
      {/* Sección de bienvenida con imagen de fondo */}
      <div  
  className="relative px-6 py-24 text-center min-h-screen flex items-center justify-center transition-opacity duration-1000 ease-in-out bg-cover bg-center md:bg-fixed"
  style={{ backgroundImage: "url('/webp/mural.webp')" }}
></div>


      {/* Texto con transición */}
      <div className="min-h-16 bg-gradient-to-b from-transparent to-gray-100 opacity-50">
  <p className="text-lg md:text-xl text-center font-medium leading-relaxed p-2.5 text-gray-900">
    Cementerio Parque Valle de Paz - Ruta 2 Km 43 - La Plata, Buenos Aires
  </p>
</div>


      {/* Sección con información */}
      <div  
  className="relative px-6 py-8 text-center min-h-screen flex items-center justify-center bg-cover bg-center md:bg-fixed"
  style={{ backgroundImage: "url('/webp/fondo.webp')"
        }}
      >
        <div className="w-full sm:max-w-[85%] md:max-w-3xl bg-white bg-opacity-30 shadow-md rounded-xl p-6 backdrop-blur-sm">
  <p className="text-lg md:text-xl font-medium leading-relaxed text-gray-900">
    Un momento triste e inevitable nos hace sentir desamparados. Por eso en 
  </p>
  <p className="text-lg md:text-xl font-medium leading-relaxed text-gray-900 mt-2">
    Valle de Paz contamos con servicio de atención las 24hs del día.
  </p>
  <p className="block text-xl md:text-2xl font-semibold text-green-600 mt-4">
    Llamando al 0800-333-8255 (VALLE)
  </p>
</div>

      </div>

      {/* Otra sección con información */}
      <div className="min-h-16 bg-gradient-to-b from-transparent to-gray-100 opacity-50">
  <p className="text-lg md:text-xl text-center font-medium leading-relaxed p-2.5 text-gray-900">
    En Valle de Paz estamos siempre... Solo una llamada y usted tendrá todo resuelto.
  </p>
</div>

      
      <div  
  className="relative px-6 py-10 text-center min-h-screen flex items-center justify-center bg-cover bg-center md:bg-fixed"
  style={{ backgroundImage: "url('/images/fondo66.webp')"
        }}
      >
        <div className="w-full sm:max-w-[85%] md:max-w-3xl bg-white bg-opacity-30 shadow-md rounded-xl p-6 backdrop-blur-sm">
  <p className="text-lg md:text-xl font-medium leading-relaxed text-gray-900 text-center">
    En Valle de Paz contamos con un equipo altamente especializado, brindando servicios de gran calidad a nuestros clientes y ofreciendo el lugar ideal para rendir un digno homenaje a la memoria de sus seres queridos.
  </p>
</div>

      </div>

      {/* Texto adicional */}
      <div className="min-h-16 bg-gradient-to-b from-transparent to-gray-100 opacity-50">
  <p className="text-lg md:text-xl text-center font-medium leading-relaxed p-2.5 text-gray-900">
    Ofrecemos servicios de alta calidad, planes de previsión y necesidad inmediata.
  </p>
</div>


      {/* Sección del mapa */}
      <div  
  className="relative px-6 py-24 text-center min-h-screen flex items-center justify-center bg-cover bg-center md:bg-fixed"
  style={{ backgroundImage: "url('/webp/fondo4.webp')"
        }}
      >
        <div className="w-full sm:max-w-[85%] md:max-w-2xl bg-white bg-opacity-30 shadow-md rounded-xl p-6 backdrop-blur-sm">
  <p className="text-lg md:text-xl font-medium leading-relaxed text-gray-900 mb-4 text-center">
    Encontrá la ubicación exacta de Valle de Paz en el mapa
  </p>

  <div className="w-full h-64 md:h-96 border-4 border-gray-300 rounded-lg overflow-hidden">
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3271.5481041018065!2d-58.17519922537409!3d-34.91778837284333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a2da1e93d12b6d%3A0x6af2106e54d95661!2sCementerio%20Valle%20de%20Paz!5e0!3m2!1ses!2sar!4v1741734626876!5m2!1ses!2sar"
      className="w-full h-full rounded-lg aspect-video"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
    ></iframe>
  </div>
</div>

      </div>

    </div>
  );
}




































// 'use client';

// export default function Home() {
//   return (
//     <div className="relative min-h-screen flex flex-col">
      
//       <div 
//         className="relative px-6 py-24 text-center min-h-screen flex items-center justify-center transition-opacity duration-1000 ease-in-out"
//         style={{ 
//           backgroundImage: "url('/images/mural.png')", 
//           backgroundSize: 'cover', 
//           backgroundPosition: 'center',
//           backgroundAttachment: 'fixed'
//         }}
//       >
//         {/* <div className="max-w-2xl mx-auto bg-white bg-opacity-30 shadow-md rounded-xl p-6 backdrop-blur-sm">
//           <p className="text-xl font-medium leading-relaxed text-gray-900">
//             Otra sección con información adicional.
//           </p>
//         </div> */}
//       </div>

//       {/* Transición Suave */}
//       <div className="h-16 bg-gradient-to-b from-transparent to-gray-100 opacity-50">
//       <p className="text-xl text-center font-medium leading-relaxed p-2.5 text-gray-900">
//       Cementerio Parque Valle de Paz - Ruta 2 Km 43 - La Plata, Buenos Aires
//           </p>
//       </div>




//       <div 
//         className="relative px-6 py-8 text-center min-h-screen transition-opacity duration-1000 ease-in-out"
//         style={{ 
//           backgroundImage: "url('/images/fondo.jpg')", 
//           backgroundSize: 'cover', 
//           backgroundPosition: 'center',
//           backgroundAttachment: 'fixed'
//         }}
//       >
//      <div className="w-1/2 ml-0 bg-white bg-opacity-30 shadow-md rounded-xl p-6 backdrop-blur-sm">
     
//   <p className="text-xl font-medium leading-relaxed text-gray-900">
//     Un momento triste e inevitable nos hace sentir desamparados. Por eso en 
//   </p>
//   <p className="text-xl font-medium leading-relaxed text-gray-900 mt-2">
//   Valle de Paz contamos con servicio de atención durante las 24hs del día
//   </p>
//   <p className="block text-2xl font-semibold text-green mt-4">
//     Llamando al 0800-333-8255 (VALLE)
//   </p>
// </div>

//       </div>
      
//       {/* Transición Suave */}
//       <div className="h-16 bg-gradient-to-b from-transparent to-gray-100 opacity-50">
//       <p className="text-xl text-center font-medium leading-relaxed p-2.5 text-gray-900">
//       En Valle de Paz estamos siempre... Solo una llamada y usted tendrá todo resuelto.
//           </p>
//       </div>
      
//       {/* Sección 2 */}
//       <div 
//         className="relative px-6 py-10 text-center min-h-screen transition-opacity duration-1000 ease-in-out"
//         style={{ 
//           backgroundImage: "url('/images/fondo66.webp')", 
//           backgroundSize: 'cover', 
//           backgroundPosition: 'center',
//           backgroundAttachment: 'fixed'
//         }}
//       >
//         <div className="w-1/2 ml-0 bg-white bg-opacity-30 shadow-md rounded-xl p-6 backdrop-blur-sm">
//   <p className="text-xl font-medium leading-relaxed text-gray-900">
//     En Valle de Paz contamos con un equipo altamente especializado, brindando servicios de gran calidad a nuestros clientes y ofreciendo el lugar ideal para rendir un digno homenaje a la memoria de sus seres queridos.
//   </p>
// </div>

//       </div>

//       {/* Transición Suave */}
//       <div className="h-16 bg-gradient-to-b from-transparent to-gray-100 opacity-50">
//       <p className="text-xl text-center font-medium leading-relaxed p-2.5 text-gray-900">
//       Ofrecemos servicios de alta calidad, planes de previsión y necesidad inmediata.
//           </p>
//       </div>
      
//       {/* Sección 3 */}
//       <div 
//         className="relative px-6 py-24 text-center min-h-screen flex items-center justify-center transition-opacity duration-1000 ease-in-out"
//         style={{ 
//           backgroundImage: "url('/images/fondo4.png')", 
//           backgroundSize: 'cover', 
//           backgroundPosition: 'center',
//           backgroundAttachment: 'fixed'
//         }}
//       >
//         <div className="max-w-2xl mx-auto bg-white bg-opacity-30 shadow-md rounded-xl p-6 backdrop-blur-sm">
//           <p className="text-xl font-medium leading-relaxed text-gray-900">
//             Otra sección con información adicional.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };
