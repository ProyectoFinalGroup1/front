'use client';

import { useEffect, useState } from 'react';
import { IInhumado } from "../types";

export default function InhumadosList() {
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
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="text-center text-gray-600">Cargando...</p>;
  if (error) return <p className="text-center text-red-600">Error: {error}</p>;

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4 bg-white bg-opacity-30 shadow-md rounded-xl backdrop-blur-sm">
      <h2 className="text-2xl font-semibold text-center text-gray-900">Lista de Inhumados</h2>
      <ul className="mt-4 space-y-2">
        {inhumados.map((inhumado) => (
          <li key={inhumado.id} className="p-2 border-b border-gray-300">
            <span className="font-medium">{inhumado.apellido}, {inhumado.nombre}</span> -{' '}
            <span className="text-gray-600">Falleció el {inhumado.ffal}</span> |{' '}
            <span className="text-gray-600">Sector: {inhumado.sector}, Manzana {inhumado.manzana}, Parcela {inhumado.parcela}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
