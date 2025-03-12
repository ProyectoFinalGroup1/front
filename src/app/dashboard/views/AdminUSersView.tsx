'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IUserDetails } from "@/types";

const AdminUsersView = () => {
  const [users, setUsers] = useState<IUserDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const tokenData = localStorage.getItem("userSession");
        const parsedToken = tokenData ? JSON.parse(tokenData) : null;
        const token = parsedToken?.token;

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/user`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();

        if (Array.isArray(data)) {
          setUsers(data);
        } else if (data && Array.isArray(data.users)) {
          setUsers(data.users);
        } else {
          console.error("La API no devolvió un array válido de usuarios.");
          setUsers([]);
        }
      } catch (error) {
        console.error("Error al obtener los usuarios", error);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

 

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="shadow-lg rounded-2xl p-6 w-full max-w-5xl m-16">
        <h1 className="text-2xl font-bold text-center mb-4">
          Administrar Usuarios
        </h1>
        <div className="overflow-x-auto rounded-lg shadow-md bg-white">
          <table className="min-w-full border-collapse table-auto">
            <thead className="bg-gray-200">
              <tr>
              <th className="py-3 px-6 text-center font-medium text-gray-700 border border-gray-300">Nombre</th>
              <th className="py-3 px-6 text-center font-medium text-gray-700 border border-gray-300">Apellido</th>
              <th className="py-3 px-6 text-center font-medium text-gray-700 border border-gray-300">Email</th>
              <th className="py-3 px-6 text-center font-medium text-gray-700 border border-gray-300">DNI</th>
              <th className="py-3 px-6 text-center font-medium text-gray-700 border border-gray-300">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.idUser} className="border-b text-center">
                  <td className="py-3 px-6 text-sm text-gray-700 border border-gray-300">{user.nombre}</td>
                  <td className="py-3 px-6 text-sm text-gray-700 border border-gray-300">{user.apellido}</td>
                  <td className="py-3 px-6 text-sm text-gray-700 border border-gray-300">{user.email}</td>
                  <td className="py-3 px-6 text-sm text-gray-700 border border-gray-300">{user.dni}</td>
                  <td className="py-3 px-6 text-sm flex justify-center gap-2">
                    <button
                      onClick={() =>
                        router.push(`/dashboard/admin/usuarios/detalle/${user.idUser}`)
                      }
                      className="inline-flex items-center justify-center rounded-xl bg-green-500 px-4 py-2 text-lg font-bold text-white transition-all duration-150 hover:bg-green-500 hover:text-gray-900 [text-shadow:2px_2px_4px_rgba(0,0,0,0.8)] [webkit-text-stroke:1px_black]"
                    >
                      Ver Detalles
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUsersView;
