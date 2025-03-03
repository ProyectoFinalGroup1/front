import React from 'react';

const NuestraEmpresaView = () => {
  return (
    <div className="relative min-h-screen flex items-center flex-col justify-center px-8 py-12
                    bg-[url('/images/fondo3.png')] bg-cover bg-center bg-fixed" >
      <div className="p-8 rounded-2xl max-w-5xl
                      bg-white bg-opacity-70 shadow-lg
                      text-center">

        <h1 className="text-2xl font-bold mb-4 text-gray-600
                      ">
          El fallecimiento de un ser querido siempre nos toma de sorpresa
        </h1>
        <ul className="text-lg text-gray-800 text-left
                      list-disc list-inside leading-loose">
          <li>
            Con Valle de Paz tendrá todo resuelto con la mayor comodidad.
          </li>
          <li>
            Ese no es un buen momento para tomar decisiones y mucho menos negociar la contratación de servicios.
          </li>
          <li>
            Debemos contar con una protección familiar para evitar trastornos futuros y gastos imprevistos.
          </li>
          <li className='font-bold text-gray-600'>
            Valle de Paz, es una solución definitiva. Dejar temas resueltos nos dá tranquilidad. 
          </li>
        </ul>
      </div>
      
      <div className="mt-10 p-8 rounded-2xl max-w-5xl
                      bg-white bg-opacity-70 shadow-lg
                      text-center">
        
        <div className="overflow-x-auto w-full scroll-smooth">
          <div className="flex space-x-4">
            <img src="/images/fondo3.png" className="w-100 h-67 rounded-lg shadow-md" alt="Imagen 1" />
            <img src="/images/fondo5.png" className="w-100 h-67 rounded-lg shadow-md" alt="Imagen 2" />
            <img src="/images/fondo4.png" className="w-100 h-67 rounded-lg shadow-md" alt="Imagen 3" />
            <img src="/images/fondo66.webp" className="w-100 h-67 rounded-lg shadow-md" alt="Imagen 4" />
          </div>
        </div>
      </div>

      <div className="mt-10 p-8 rounded-2xl max-w-4xl
                bg-white bg-opacity-70 shadow-lg
                ">  
        <ul className="text-lg text-gray-700 
                      list-inside leading-loose">
          <li>
            El Parque ha sido diseñado y forestado por Juan Bach, uno de los mas importantes paisajistas del país.
          </li>
          <li className='font-bold text-gray-600'>
            Las casi 50 especies, plantadas hace mas de 35 años, han conformado valles naturales, cada uno de ellos luciendo infinitos tonos y texturas, lo que hace que Valle de Paz sea único.
          </li>
          <li>
            En los últimos años se ha producido una sensible transformación cultural en nuestra sociedad.
          </li>
        </ul>

      </div>
    
    </div>
  );
};

export default NuestraEmpresaView;
