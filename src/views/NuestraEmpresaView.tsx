'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import Image from 'next/image';

const images = [
  "/images/fondo9.png",
  "/images/fondo66.webp",
  "/images/fondo5.png",
  "/images/IMG_4240.jpg",
  "/images/IMG_3869.jpg",
  "/images/fondo4.png",
  "/images/fondo8.png",
  
];

const NuestraEmpresaView = () => {
  const [index, setIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2500);
    return () => clearInterval(interval);
}, []);

  // Función para deslizar manualmente
  const handleDragEnd = (event, info) => {
    if (info.offset.x < -50) {
      // Deslizar a la izquierda → siguiente imagen
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    } else if (info.offset.x > 50) {
      // Deslizar a la derecha → imagen anterior
      setIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center flex-col justify-center px-8 py-12
                    bg-[url('/images/fondo3.png')] bg-cover bg-center bg-fixed" >
      <div className="mt-28 mb-14 p-8 rounded-2xl max-w-5xl
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
      

    <div className="mt-10 p-3 rounded-2xl max-w-5xl relative w-full h-[600px]
                    bg-white bg-opacity-70 shadow-lg overflow-hidden">

      {/* Contenedor del carrusel */}
      <div className="w-full h-full rounded-2xl relative
                      ">
         <AnimatePresence>
          <motion.div
            key={index}
            className="absolute w-full h-full object-cover rounded-2xl"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
          >
            <Image
            src={images[index]}
            alt={`Imagen ${index + 1}`}
            layout="fill"
            objectFit="cover"
            className="rounded-2xl"
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>

      {/* Indicadores (puntos) */}
      <div className="mt-4 flex space-x-2">
        {images.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-all ${
              i === index ? "bg-gray-800 scale-125" : "bg-gray-400"
            }`}
          />
        ))}
      </div>




      <div className="mt-10 p-8 rounded-2xl max-w-5xl
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
        </ul>

      </div>

      
      <div className="my-28 p-8 rounded-2xl max-w-4xl
                bg-white bg-opacity-70 shadow-lg
                ">
        <h1 className='font-bold text-gray-600 text-lg text-center'>
          UBICACIÓN: Autopista Ruta 2, Km. 43.
        </h1>
        <div>
          <Image
          src="/images/mapa.jpg"
          alt=""
          width={650}
          height={650}
          className='rounded-2xl my-5' 
          />
        </div>
      </div>
    
      <div className="my-7 p-8 rounded-2xl max-w-5xl
                bg-white bg-opacity-70 shadow-lg
                ">
        <h1 className='font-bold text-gray-600 text-lg text-center'>
          NUESTRAS PARCELAS
        </h1>
        <ul className="text-lg text-gray-700 
                      list-inside leading-loose
                      mt-3">
          <li>
            Todas las parcelas de Valle de Paz son de igual tamaño y una misma calidad de césped y parquización, aunque su precio varía en función de la ubicación.
            Por todo esto Valle de Paz ha demostrado ser la única alternativa realmente valida al momento de buscar soluciones dignas y para siempre.        
          </li>  
        </ul>  
      </div>

      <div className="my-28 p-8 rounded-2xl max-w-3xl
                bg-white bg-opacity-70 shadow-lg
                ">
        <h1 className='font-bold text-gray-600 text-lg text-center mb-3'>
            CERTIFICADO DE APTITUD AMBIENTAL
        </h1>
        <p  className="text-lg text-gray-700 leading-loose">
          En los últimos años se ha producido una sensible transformación cultural en nuestra sociedad.
          Por un lado respecto a los requerimientos de excelencia en los servicios,
          pero también respecto al tan importante aspecto ecológico y la calidad del medio ambiente.
        </p>
        <div className='flex justify-center'>
        <Image
          src="/images/CertificadoAmbiental.png"
          alt=""
          width={650}
          height={650}
          className='rounded-2xl my-5' 
          />
        </div>
      </div>
    </div>
  );
};

export default NuestraEmpresaView;
