'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "/images/fondo3.png",
  "/images/fondo5.png",
  "/images/fondo4.png",
  "/images/fondo66.webp",
];

const NuestraEmpresaView = () => {
  const [index, setIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
}, []);

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
      



      <div className="mt-10 rounded-2xl max-w-5xl relative w-full h-[500px]
                      overflow-hidden shadow-lg
                      bg-white">
         <AnimatePresence>
          <motion.img
            key={index}
            src={images[index]}
            className="absolute w-full h-full object-cover rounded-2xl"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          />
        </AnimatePresence>
      </div>
      <div className="mt-4 flex space-x-2">
        {images.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full ${
              i === index ? "bg-gray-800" : "bg-gray-400"
            }`}
          />
        ))}
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
