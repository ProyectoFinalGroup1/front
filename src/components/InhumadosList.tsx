'use client'
import { useEffect, useState } from 'react';
import { IInhumado } from '@/types/index';
import Link from 'next/link';

interface InhumadosListProps {
  searchTerm: string;
}

export default function InhumadosList({ searchTerm }: InhumadosListProps) {
  const [inhumados, setInhumados] = useState<IInhumado[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [valle, setValle] = useState<string>('');
  const [year, setYear] = useState<string>('');

 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/inhumados`);
        if (!response.ok) throw new Error('Error al obtener los datos');
        const data: IInhumado[] = await response.json();
        setInhumados(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Ocurrió un error desconocido');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
//agregar aca
  if (loading) return <p className="text-center text-white-600">Cargando...</p>;
  if (error) return <p className="text-center text-red-600">Error: {error}</p>;

  const uniqueValles = [...new Set(inhumados.map((inhumado) => inhumado.valle))];
  const uniqueYears = [...new Set(inhumados.map((inhumado) => {
    const partes = inhumado.ffal.split(" ");
    return partes[partes.length - 1]; 
  }))].sort((a, b) => Number(b) - Number(a));

  const filteredInhumados = inhumados.filter((inhumado) =>
    `${inhumado.nombre} ${inhumado.apellido}`.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (valle ? inhumado.valle === valle : true) &&
    (year ? inhumado.ffal.endsWith(year) : true)
  );

  if (loading) return <p className="text-center text-white-600">Cargando...</p>;
  if (error) return <p className="text-center text-red-600">Error: {error}</p>;



  return (
    <div className="max-w-2xl mx-auto mt-4 p-3 bg-white bg-opacity-30 shadow-md rounded-xl backdrop-blur-sm">
      <h2 className="text-2xl font-semibold text-center text-white">🕊️🕊️🕊️🕊️🕊️🕊️🕊️🕊️🕊️</h2>
       
       <div className="flex flex-wrap justify-center gap-4 mt-2">        
         <select
                   value={valle} 
                onChange={(e) => setValle(e.target.value)}
                className="w-full max-w-[250px] sm:w-auto p-2 border rounded-lg bg-white text-black" >
                 <option value="">Ubicacion por Valle(Todos)</option> 
                  {uniqueValles.map((val) => ( 
                   <option key={val} value={val}> 
                     {val} 
                    </option> 
                 ))} 
               </select> 
        
                
                 <select 
                   value={year} 
                   onChange={(e) => setYear(e.target.value)} 
                  className="w-full max-w-[250px] sm:w-auto p-2 border rounded-lg bg-white text-black">
                   <option value="">Año de Fallecimiento(Todos)</option> 
                 {uniqueYears.map((y) => ( 
                     <option key={y} value={y}> 
                     {y} 
                     </option> 
                   ))} 
                 </select> 
               </div> 
         
       
      <ul className="mt-4 space-y-2">
        {filteredInhumados.length > 0 ? (
          filteredInhumados.map((inhumado) => (
            <li key={inhumado.id} className="p-4 border-b border-gray-300 flex flex-col items-center text-center">
              <span className="font-bold text-lg">
                <Link href={`/inhumados/${inhumado.id}`} className="text-green-800 hover:underline">
                  {inhumado.apellido}, {inhumado.nombre}
                </Link>
              </span>
              <div className="text-white-600 mt-1">
                <p>Nacido el {inhumado.fnac}</p>
                <p>Fallecido el {inhumado.ffal}</p>
                <p>Valle: {inhumado.valle}, Sector: {inhumado.sector}, Manzana {inhumado.manzana}, Parcela {inhumado.parcela}</p>
                    
              </div>
            </li>

          ))
        ) : (
          <p className="text-center text-white-500">No se encontraron resultados.</p>
        )}
      </ul>
    </div>
  );
}





















//ORIGINAL
// 'use client';

// import { useEffect, useState } from 'react';
// import { IInhumado } from "../types";

// interface InhumadosListProps {
//   searchTerm: string;
// }

// export default function InhumadosList({ searchTerm }: InhumadosListProps) {
//   const [inhumados, setInhumados] = useState<IInhumado[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [valle, setValle] = useState<string>("");
//   const [year, setYear] = useState<string>("");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/inhumados`);
//         if (!response.ok) throw new Error('Error al obtener los datos');
//         const data: IInhumado[] = await response.json();
//         setInhumados(data);
//       } catch (err: unknown) {
//         if (err instanceof Error) {
//           setError(err.message);
//         } else {
//           setError('Ocurrió un error desconocido');
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);
// --------------
//   if (loading) return <p className="text-center text-white-600">Cargando...</p>;
//   if (error) return <p className="text-center text-red-600">Error: {error}</p>;

//   const uniqueValles = [...new Set(inhumados.map((inhumado) => inhumado.valle))];

  
//   const uniqueYears = [...new Set(inhumados.map((inhumado) => {
//     const partes = inhumado.ffal.split(" ");
//     return partes[partes.length - 1]; 
//   }))].sort((a, b) => Number(b) - Number(a));
// ------------
//   const filteredInhumados = inhumados.filter((inhumado) =>
//     `${inhumado.nombre} ${inhumado.apellido}`.toLowerCase().includes(searchTerm.toLowerCase()) &&
//     (valle ? inhumado.valle === valle : true) &&
//     (year ? inhumado.ffal.endsWith(year) : true) 
//   );

//   return (
//     <div className="max-w-2xl mx-auto mt-4 p-2 bg-white bg-opacity-30 shadow-md rounded-xl backdrop-blur-sm">
//       <h2 className="text-2xl font-semibold text-center text-white">Lista de Inhumados</h2>

      
//       <div className="flex justify-center gap-4 mt-2">
        
//         <select
//           value={valle}
//           onChange={(e) => setValle(e.target.value)}
//           className="p-2 border rounded-lg bg-white text-black"
//         >
//           <option value="">Ubicacion por Valle(Todos)</option>
//           {uniqueValles.map((val) => (
//             <option key={val} value={val}>
//               {val}
//             </option>
//           ))}
//         </select>

        
//         <select
//           value={year}
//           onChange={(e) => setYear(e.target.value)}
//           className="p-2 border rounded-lg bg-white text-black"
//         >
//           <option value="">Año de Fallecimiento(Todos)</option>
//           {uniqueYears.map((y) => (
//             <option key={y} value={y}>
//               {y}
//             </option>
//           ))}
//         </select>
//       </div>

//       <ul className="mt-4 space-y-2">
//         {filteredInhumados.length > 0 ? (
//           filteredInhumados.map((inhumado) => (
//             <li key={inhumado.id} className="p-4 border-b border-gray-300 flex flex-col items-center text-center">
//               <span className="font-bold text-lg">{inhumado.apellido}, {inhumado.nombre}</span>
//               <div className="text-white-600 mt-1">
//                 <p>Nacido el {inhumado.fnac}</p>
//                 <p>Fallecido el {inhumado.ffal}</p>
//                 <p>Valle: {inhumado.valle}, Sector: {inhumado.sector}, Manzana {inhumado.manzana}, Parcela {inhumado.parcela}</p>
//               {/* sumar ncliente para el renderizado de obituarios en dashboard de admin */}
//               </div>
//             </li>
//           ))
//         ) : (
//           <p className="text-center text-white-500">No se encontraron resultados.</p>
//         )}
//       </ul>
//     </div>
//   );
// }

















