'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { IInhumadoDetail } from '@/types';




const AdminInhumadosView = () => {
  const [inhumados, setInhumados] = useState<IInhumadoDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  
  useEffect(() => {
    fetchInhumados();
  }, []);
  
  const fetchInhumados = async () => {
    setLoading(true);
    try {
      const tokenData = localStorage.getItem('userSession');
      const parsedToken = tokenData ? JSON.parse(tokenData) : null;
      const token = parsedToken?.token;
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/inhumados`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error('Error al cargar los inhumados');
      }
      const data = await response.json();
      setInhumados(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };
  
  const handleDelete = async (id: string) => {
    // Crear un toast personalizado para confirmar la eliminación
    const confirmed = await new Promise<boolean>((resolve) => {
       toast((t) => (
        <div
        >
          <p style={{ marginBottom: '10px', fontSize: '16px', fontWeight: 'bold' }}>
            ¿Está seguro que desea eliminar este inhumado?
          </p>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
            <button
              onClick={() => {
                toast.dismiss(t.id);  // Cerrar el toast
                resolve(true);         // Confirmación
              }}
              style={{
                backgroundColor: 'green',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 'bold',
                transition: 'background-color 0.3s ease',
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'darkgreen'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'green'}
            >
              Sí
            </button>
            <button
              onClick={() => {
                toast.dismiss(t.id);  // Cerrar el toast
                resolve(false);        // Cancelación
              }}
              style={{
                backgroundColor: 'red',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 'bold',
                transition: 'background-color 0.3s ease',
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'darkred'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'red'}
            >
              No
            </button>
          </div>
        </div>
      ));
    });
  
    // Si el usuario no confirma, detener el proceso
    if (!confirmed) {
      return;
    }
  
    try {
      const tokenData = localStorage.getItem('userSession');
      const parsedToken = tokenData ? JSON.parse(tokenData) : null;
      const token = parsedToken?.token;
  
      // Realizar la solicitud de eliminación
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/inhumados/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al eliminar el inhumado');
      }
  
      // Mostrar un toast de éxito si se elimina correctamente
      toast.success('Inhumado eliminado con éxito.');
  
      // Actualizar la lista después de eliminar
      fetchInhumados();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Error al eliminar el inhumado');
    }
  };
  
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Filtrar localmente (alternativa: hacer fetch con searchTerm)
    fetchInhumados();
  };
  
  const filteredInhumados = searchTerm 
    ? inhumados.filter(i => 
        i.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
        i.apellido.toLowerCase().includes(searchTerm.toLowerCase()))
    : inhumados;
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="rounded-2xl p-6 w-full max-w-5xl m-16">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-center mb-4">Gestión de Inhumados</h1>
          <Link 
            href="/dashboard/admin/inhumados/altaInhumado" 
            className="inline-flex items-center justify-center rounded-xl bg-green-800 px-3 py-1.5 text-sm font-bold text-white transition-all duration-150 hover:bg-green-500 hover:text-gray-900 [text-shadow:1px_1px_2px_rgba(0,0,0,0.8)] [webkit-text-stroke:0.5px_black]"
          >
            Agregar Inhumado
          </Link>
        </div>
        
        <form onSubmit={handleSearch} className="mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Buscar por nombre o apellido..."
              className="flex-1 p-2 border rounded"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button 
              type="submit"
              className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
            >
              Buscar
            </button>
          </div>
        </form>
        
        {error ? (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
            <p>{error}</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg shadow-md bg-white max-w-[800px] mx-auto">
  <table className="w-auto border-collapse table-auto">
    <thead className="bg-gray-200">
      <tr>
        <th className="py-3 px-4 text-center font-medium text-gray-700 border border-gray-300">Nombre</th>
        <th className="py-3 px-4 text-center font-medium text-gray-700 border border-gray-300">Apellido</th>
        <th className="py-3 px-4 text-center font-medium text-gray-700 border border-gray-300">Fecha Nacimiento</th>
        <th className="py-3 px-4 text-center font-medium text-gray-700 border border-gray-300">Fecha Fallecimiento</th>
        <th className="py-3 px-4 text-center font-medium text-gray-700 border border-gray-300">Valle</th>
        <th className="py-3 px-4 text-center font-medium text-gray-700 border border-gray-300">Ubicación</th>
        <th className="py-3 px-4 text-center font-medium text-gray-700 border border-gray-300">Acciones</th>
      </tr>
    </thead>
    <tbody>
      {filteredInhumados.length === 0 ? (
        <tr>
          <td colSpan={7} className="text-center py-4 border border-gray-300">
            No se encontraron inhumados
          </td>
        </tr>
      ) : (
        filteredInhumados.map((inhumado) => (
          <tr key={inhumado.id} className="border-b text-center">
            <td className="py-2 px-4 text-sm text-gray-700 border border-gray-300">{inhumado.nombre}</td>
            <td className="py-2 px-4 text-sm text-gray-700 border border-gray-300">{inhumado.apellido}</td>
            <td className="py-2 px-4 text-sm text-gray-700 border border-gray-300">{inhumado.fnac}</td>
            <td className="py-2 px-4 text-sm text-gray-700 border border-gray-300">{inhumado.ffal}</td>
            <td className="py-2 px-4 text-sm text-gray-700 border border-gray-300">{inhumado.valle}</td>
            <td className="py-2 px-4 text-sm text-gray-700 border border-gray-300">
              Sector: {inhumado.sector}, Manzana: {inhumado.manzana}, Parcela: {inhumado.parcela}
            </td>
            <td className="py-2 px-4 text-xs border border-gray-300">
              <div className="flex flex-col items-center gap-1">
                <Link 
                  href={`/dashboard/admin/inhumados/detalle/${inhumado.id}`}
                  className="inline-flex items-center justify-center rounded-md bg-green-800 px-2 py-1 text-xs font-medium text-white transition-all duration-150 hover:bg-green-500 hover:text-gray-900"
                >
                  Ver
                </Link>
                <Link 
                  href={`/dashboard/admin/inhumados/editar/${inhumado.id}`}
                  className="inline-flex items-center justify-center rounded-md bg-yellow-600 px-2 py-1 text-xs font-medium text-white transition-all duration-150 hover:bg-yellow-500 hover:text-gray-900"
                >
                  Editar
                </Link>
                <button 
                  onClick={() => handleDelete(inhumado.id)}
                  className="inline-flex items-center justify-center rounded-md bg-red-600 px-2 py-1 text-xs font-medium text-white transition-all duration-150 hover:bg-red-500 hover:text-gray-900"
                >
                  Eliminar
                </button>
              </div>
            </td>
          </tr>
        ))
      )}
    </tbody>
  </table>
</div>

        
        )}
      </div>
    </div>
  );
}

export default AdminInhumadosView;