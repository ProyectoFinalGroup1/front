'use client';

import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, RefreshCw, TrendingUp } from 'lucide-react';
import { jsPDF } from "jspdf";



interface Donacion {
  id: string;
  monto: number;
  Date: string;
  DonacionUser: {
    nombre: string,
    apellido: string,
  }
}

const AdminDonacionesView = () => {
  const [donaciones, setDonaciones] = useState<Donacion[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Paginación
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;
  
  // Filtrado y ordenamiento
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [sortBy, setSortBy] = useState<'date' | 'amount'>('date');

  const fetchDonaciones = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const tokenData = localStorage.getItem('userSession');
      const parsedToken = tokenData ? JSON.parse(tokenData) : null;
      const token = parsedToken?.token;

      if (!token) {
        throw new Error('No se encontró token de autenticación');
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mercadopago/ALLdonaciones`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (Array.isArray(data)) {
        setDonaciones(data);
        setTotal(data.reduce((acc, donacion) => acc + donacion.monto, 0));
      } else {
        throw new Error('La API no devolvió un array válido de donaciones.');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      setError(errorMessage);
      console.error('Error al obtener las donaciones', error);
      setDonaciones([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonaciones();
  }, []);

  // Ordenar donaciones
  const sortedDonaciones = [...donaciones].sort((a, b) => {
    if (sortBy === 'date') {
      const dateA = new Date(a.Date).getTime();
      const dateB = new Date(b.Date).getTime();
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    } else {
      return sortOrder === 'asc' ? a.monto - b.monto : b.monto - a.monto;
    }
  });

  // Calcular páginas
  const totalPages = Math.ceil(sortedDonaciones.length / itemsPerPage);
  const paginatedDonaciones = sortedDonaciones.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  // Formatear fecha
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Manejar cambio de página
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // Manejar cambio de ordenamiento
  const toggleSort = (column: 'date' | 'amount') => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  // Calcular estadísticas
  const maxDonacion = donaciones.length > 0 
    ? Math.max(...donaciones.map(d => d.monto)) 
    : 0;
  
  const avgDonacion = donaciones.length > 0 
    ? total / donaciones.length 
    : 0;
    const generarPDF = async () => {
  const doc = new jsPDF();
  const imgUrl = "/images/logo.jpg"; 

  // Cargar la imagen y agregarla al PDF
  const img = new Image();
  img.src = imgUrl;
  img.onload = () => {
    doc.addImage(img, "PNG", 20, 10, 30, 30); // Posición y tamaño del logo
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Reporte de Donaciones", 70, 25);

    let y = 50;
    let totalRecaudado = 0;

    // Encabezados de la tabla
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("Nombre", 20, y);
    doc.text("Monto", 100, y);
    doc.text("Fecha", 150, y);
    y += 10;

    // Dibujar línea separadora
    doc.setDrawColor(0);
    doc.line(20, y, 180, y);
    y += 10;

    // Datos de donaciones
    doc.setFont("helvetica", "normal");
    donaciones.forEach((donacion) => {
      const monto = donacion.monto;
      totalRecaudado += monto;

      doc.text(`${donacion.DonacionUser.nombre} ${donacion.DonacionUser.apellido}`, 20, y);
      doc.text(`$${monto.toFixed(2)}`, 100, y);
      doc.text(formatDate(donacion.Date), 150, y);
      y += 10;
    });

    // Línea separadora antes del total
    doc.setDrawColor(0);
    doc.line(20, y, 180, y);
    y += 10;

    // Total Recaudado
    doc.setFont("helvetica", "bold");
    doc.text(`Total Recaudado: $${totalRecaudado.toFixed(2)}`, 100, y);

    // Guardar el PDF
    doc.save("reporte_donaciones.pdf");
  };
};


  return (
    <div className="">
      <div className="container mx-auto p-6 max-w-6xl m-16 ">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Donaciones</h1>
          <div className="flex space-x-2">
            <button 
              onClick={fetchDonaciones}
              className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-100 transition-colors"
            >
              <RefreshCw size={18} />
              <span>Actualizar</span>
            </button>
            <button 
  onClick={generarPDF}
  className="bg-green-50 text-green-600 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-100 transition-colors"
>
  <span>Descargar PDF</span>
</button>
          </div>
        </div>

        {/* Tarjetas de estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="bg-blue-50 p-3 rounded-lg mr-4">
                <TrendingUp className="" size={24} />
              </div>
              <div>
                <p className="text-sm font-medium">Total Recaudado</p>
                <h3 className="text-2xl font-bold">${total.toFixed(2)}</h3>
              </div>
            </div>
          </div>
          
          <div className="rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <div className=" p-3 rounded-lg mr-4">
                <TrendingUp className="text-purple-600" size={24} />
              </div>
              <div>
                <p className="text-sm font-medium">Donación Promedio</p>
                <h3 className="text-2xl font-bold">${avgDonacion.toFixed(2)}</h3>
              </div>
            </div>
          </div>
          
          <div className="rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <div className=" p-3 rounded-lg mr-4">
                <TrendingUp className="" size={24} />
              </div>
              <div>
                <p className="text-sm font-medium">Mayor Donación</p>
                <h3 className="text-2xl font-bold">${maxDonacion.toFixed(2)}</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Manejo de estados de carga y error */}
        {loading && (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando donaciones...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6">
            <p className="font-medium">Error al cargar los datos</p>
            <p className="text-sm">{error}</p>
            <button 
              onClick={fetchDonaciones}
              className="mt-2 text-sm bg-red-100 px-3 py-1 rounded hover:bg-red-200"
            >
              Reintentar
            </button>
          </div>
        )}

        {/* Tabla de Donaciones */}
        {!loading && !error && donaciones.length > 0 && (
          <div className="bg-white shadow-sm rounded-xl border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Donante
                    </th>
                    <th 
                      className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => toggleSort('amount')}
                    >
                      <div className="flex items-center gap-1">
                        Monto
                        {sortBy === 'amount' && (
                          <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>
                        )}
                      </div>
                    </th>
                    <th 
                      className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => toggleSort('date')}
                    >
                      <div className="flex items-center gap-1">
                        Fecha
                        {sortBy === 'date' && (
                          <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>
                        )}
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedDonaciones.map((donacion, index) => (
                    <tr key={`donacion-${donacion.id}-${index}`} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {donacion.DonacionUser.nombre} {donacion.DonacionUser.apellido}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-gray-900">
                          ${donacion.monto.toFixed(2)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {formatDate(donacion.Date)}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Paginación */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Mostrando <span className="font-medium">{paginatedDonaciones.length}</span> de{' '}
                <span className="font-medium">{donaciones.length}</span> donaciones
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={18} />
                </button>
                
                <div className="flex items-center space-x-1">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={`page-${i}`}
                      onClick={() => handlePageChange(i + 1)}
                      className={`px-3 py-1 rounded ${
                        currentPage === i + 1
                          ? 'bg-blue-600 text-white'
                          : 'hover:bg-gray-200'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Estado vacío */}
        {!loading && !error && donaciones.length === 0 && (
          <div className="bg-white shadow-sm rounded-xl p-12 text-center border border-gray-100">
            <p className="text-gray-500 text-lg mb-2">No hay donaciones registradas</p>
            <p className="text-gray-400 mb-4">Las donaciones aparecerán aquí una vez procesadas</p>
            <button 
              onClick={fetchDonaciones} 
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Verificar nuevamente
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDonacionesView;