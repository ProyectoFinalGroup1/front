//FUNCIONA PERO SIN BUILD
'use client';

import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { IUserDetails } from '@/types';

const UserDatosView = () => {
  const [user, setUser] = useState<IUserDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const tokenData = localStorage.getItem('userSession');
        const parsedToken = tokenData ? JSON.parse(tokenData) : null;
        const token = parsedToken?.token;
        const userId = parsedToken?.user?.idUser; // Asegurarnos de obtener el ID

        if (!token || !userId) {
          throw new Error('No se encontró el usuario o el token');
        }

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

      } catch (err) {
        setError(`Error al cargar los datos del usuario: ${String(err)}`);

      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prevUser) =>
      prevUser ? { ...prevUser, [e.target.name]: e.target.value } : null
    );
  };

  const handleSave = () => {
    toast(
      (t) => (
        <div className="text-center">
          <p className="font-medium">¿Seguro que quieres guardar los cambios?</p>
          <div className="flex justify-center gap-4 mt-2">
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                try {
                  const tokenData = localStorage.getItem('userSession');
                  const parsedToken = tokenData ? JSON.parse(tokenData) : null;
                  const token = parsedToken?.token;
                  const userId = parsedToken?.user?.idUser;

                  if (!token || !userId) {
                    throw new Error('No se encontró el usuario o el token');
                  }

                  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/datos/${userId}`, {
                    method: 'PATCH',
                    headers: {
                      Authorization: `Bearer ${token}`,
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(user),
                  });

                  if (!response.ok) {
                    throw new Error('No se pudieron guardar los cambios');
                  }

                  toast.success('Usuario actualizado correctamente');
                
                } catch (error) {
                  toast.error('Error al actualizar el usuario');
                  console.error('Error al actualizar el usuario', error);
                }
              }}
              className="bg-green-500 text-white px-3 py-1 rounded-md shadow-md hover:bg-green-700 transition"
            >
              Sí, guardar
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

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  if (!user) return <p className="text-gray-500 text-center">No se encontró el usuario</p>;

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="shadow-lg rounded-2xl p-6 max-w-lg w-full">
        <h1 className="text-2xl font-bold text-center mb-4">Perfil de Usuario</h1>
        <div className="space-y-3">
          <label className="block mb-2">
            Nombre:
            <input
              type="text"
              name="nombre"
              value={user.nombre}
              onChange={handleInputChange}
              className="border rounded w-full p-2"
            />
          </label>
          <label className="block mb-2">
            Apellido:
            <input
              type="text"
              name="apellido"
              value={user.apellido}
              onChange={handleInputChange}
              className="border rounded w-full p-2"
            />
          </label>
          <label className="block mb-2">
            Email:
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleInputChange}
              className="border rounded w-full p-2"
            />
          </label>
          <label className="block mb-2">
            DNI:
            <input
              type="text"
              name="dni"
              value={user.dni}
              onChange={handleInputChange}
              className="border rounded w-full p-2"
            />
          </label>
          <label className="block mb-2">
            Teléfono:
            <input
              type="text"
              name="phoneNumber"
              value={user.phoneNumber}
              onChange={handleInputChange}
              className="border rounded w-full p-2"
            />
          </label>

          <div className="flex justify-center mt-4 gap-4">
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-6 py-2 rounded-xl hover:bg-green-700 transition-all"
            >
              Guardar cambios
            </button>
            {/* <button
              onClick={() => router.back()}
              className="bg-gray-500 text-white px-6 py-2 rounded-xl hover:bg-gray-700 transition-all"
            >
              Volver atrás
            </button> */}
          </div>

            <p className="mt-4 text-center text-gray-600 text-sm">
          Si necesita cambiar más datos, por favor contáctese con Valle de Paz al
          <span className="font-semibold"> 0800-333-8255 </span> o por WhatsApp al
          <span className="font-semibold"> 1166569773</span>.
        </p>
        </div>
      </div>
    </div>
  );
};

export default UserDatosView;





























