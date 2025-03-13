'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { IUserDetails } from '@/types';

const AdminUserDetailView = () => {
  const { userId } = useParams();
  const [user, setUser] = useState<IUserDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const tokenData = localStorage.getItem('userSession');
        const parsedToken = tokenData ? JSON.parse(tokenData) : null;
        const token = parsedToken?.token;

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/datos/${userId}`, {
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
        setUser(data.Usuario);
      } catch {
        setError('Error al cargar los datos del usuario');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const handleEdit = () => {
    router.push(`/dashboard/admin/usuarios/editar/${userId}`);
  };

  const handleDelete = async () => {
    toast(
      (t) => (
        <div className="text-center">
          <p className="font-medium">¿Estás seguro de eliminar este usuario?</p>
          <div className="flex justify-center gap-4 mt-2">
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                try {
                  const tokenData = localStorage.getItem('userSession');
                  const parsedToken = tokenData ? JSON.parse(tokenData) : null;
                  const token = parsedToken?.token;

                  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/datos/${userId}`, {
                    method: 'DELETE',
                    headers: {
                      Authorization: `Bearer ${token}`,
                      'Content-Type': 'application/json',
                    },
                  });

                  if (!response.ok) {
                    throw new Error('No se pudo eliminar el usuario');
                  }

                  toast.success('Usuario eliminado correctamente');
                  router.push('/dashboard/admin/usuarios');
                } catch (error) {
                  toast.error('Error al eliminar el usuario');
                  console.error('Error al eliminar el usuario', error);
                }
              }}
              className="bg-red-500 text-white px-3 py-1 rounded-md shadow-md hover:bg-red-700 transition"
            >
              Sí, eliminar
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="bg-gray-500 text-white px-3 py-1 rounded-md shadow-md hover:bg-gray-700 transition"
            >
              Cancelar
            </button>
          </div>
        </div>
      ),
      { duration: Infinity }
    );
  };

  const handleBack = () => {
    router.push('/dashboard/admin/usuarios');
  };

  // Formatear la fecha correctamente sin desplazamientos de zona horaria
  const formatDisplayDate = (dateString: string | null | undefined) => {
    if (!dateString) return 'No disponible';
    
    try {
      // Crear fecha a partir del string ISO
      const date = new Date(dateString);
      
      // Extraer componentes de fecha en UTC para evitar desplazamientos de zona horaria
      const day = String(date.getUTCDate()).padStart(2, '0');
      const month = String(date.getUTCMonth() + 1).padStart(2, '0');
      const year = date.getUTCFullYear();
      
      // Formato DD/MM/YYYY para mostrar
      return `${day}/${month}/${year}`;
    } catch (e) {
      console.error("Error formatting date:", e);
      return 'Fecha inválida';
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );

  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!user) return <p className="text-gray-500 text-center">No se encontró el usuario</p>;

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className=" shadow-lg rounded-2xl p-6 max-w-lg w-full">
        <h1 className="text-2xl font-bold text-center mb-4">Detalles del Usuario</h1>
        <div className="space-y-3">
          <p className="text-lg">
            <strong>👤 Nombre:</strong> {user.nombre} {user.apellido}
          </p>
          <p className="text-lg">
            <strong>📧 Email:</strong> {user.email}
          </p>
          <p className="text-lg">
            <strong>🆔 DNI:</strong> {user.dni}
          </p>
          <p className="text-lg">
            <strong>📞 Teléfono:</strong> {user.phoneNumber ? user.phoneNumber : 'No disponible'}
          </p>
          <p className="text-lg">
            <strong>📅 Recibe Recordatorios:</strong>
            <span className="ml-2">{user.recibirRecordatoriosAniversarios ? '✅' : '❌'}</span>
          </p>
          <p className="text-lg">
            <strong>💰 Fecha de pago:</strong> {formatDisplayDate(user.fechaPago?.toString())}
          </p>
        </div>

        <div className="mt-6 flex justify-between">
          <button
            onClick={handleEdit}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md transition hover:bg-blue-700"
          >
            ✏️ Editar
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md transition hover:bg-red-700"
          >
            🗑️ Eliminar
          </button>
          
          <button
            onClick={handleBack}
            className="bg-gray-500 text-white px-6 py-2 rounded-xl hover:bg-gray-700 transition-all"
          >
            Volver a la lista
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminUserDetailView;