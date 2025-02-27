'use client';

import { useEffect, useState } from 'react';
import { IInhumado } from "../types";

interface InhumadosListProps {
  searchTerm: string;
}

export default function InhumadosList({ searchTerm }: InhumadosListProps) {
  const [inhumados, setInhumados] = useState<IInhumado[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) return <p className="text-center text-gray-600">Cargando...</p>;
  if (error) return <p className="text-center text-red-600">Error: {error}</p>;

  const filteredInhumados = inhumados.filter((inhumado) =>
    `${inhumado.nombre} ${inhumado.apellido}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-2xl mx-auto mt-4 p-2 bg-white bg-opacity-30 shadow-md rounded-xl backdrop-blur-sm">
      <h2 className="text-2xl font-semibold text-center text-white">Lista de Inhumados</h2>

      <ul className="mt-4 space-y-2">
        {filteredInhumados.length > 0 ? (
          filteredInhumados.map((inhumado) => (
            <li key={inhumado.id} className="p-4 border-b border-gray-300 flex flex-col items-center text-center">
              <span className="font-bold text-lg">{inhumado.apellido}, {inhumado.nombre}</span>
              <div className="text-gray-600 mt-1">
                <p>Falleció el {inhumado.ffal}</p>
                <p>Sector: {inhumado.sector}, Manzana {inhumado.manzana}, Parcela {inhumado.parcela}</p>
              </div>
            </li>
          ))
        ) : (
          <p className="text-center text-gray-500">No se encontraron resultados.</p>
        )}
      </ul>
    </div>
  );
}



















// 'use client';

// import { useEffect, useState } from 'react';
// import { IInhumado } from "../types";

// export default function InhumadosList() {
//   const [inhumados, setInhumados] = useState<IInhumado[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/inhumados`);
//         if (!response.ok) throw new Error('Error al obtener los datos');
//         const data: IInhumado[] = await response.json();
//         setInhumados(data);
//       } catch (err: any) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) return <p className="text-center text-gray-600">Cargando...</p>;
//   if (error) return <p className="text-center text-red-600">Error: {error}</p>;

//   return (
//     <div className="max-w-2xl mx-auto mt-8 p-4 bg-white bg-opacity-30 shadow-md rounded-xl backdrop-blur-sm">
//       <h2 className="text-2xl font-semibold text-center text-gray-900">Lista de Inhumados</h2>
//       <ul className="mt-4 space-y-2">
//         {inhumados.map((inhumado) => (
//           <li key={inhumado.id} className="p-2 border-b border-gray-300">
//             <span className="font-medium">{inhumado.apellido}, {inhumado.nombre}</span> -{' '}
//             <span className="text-gray-600">Falleció el {inhumado.ffal}</span> |{' '}
//             <span className="text-gray-600">Sector: {inhumado.sector}, Manzana {inhumado.manzana}, Parcela {inhumado.parcela}</span>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
