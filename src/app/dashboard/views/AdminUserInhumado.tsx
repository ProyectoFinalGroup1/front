"use client";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

type User = {
  idUser: number;
  nombre: string;
  apellido: string;
};

type Inhumado = {
  id: number;
  nombre: string;
  apellido: string;
};

const AdminUserInhumado = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [inhumados, setInhumados] = useState<Inhumado[]>([]);
  const [userSearch, setUserSearch] = useState("");
  const [inhumadoSearch, setInhumadoSearch] = useState("");
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedInhumadoId, setSelectedInhumadoId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasToastBeenShown, setHasToastBeenShown] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const tokenData = localStorage.getItem("userSession");
        const parsedToken = tokenData ? JSON.parse(tokenData) : null;
        const token = parsedToken?.token;

        const usersResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const usersData: User[] = await usersResponse.json();
        setUsers(usersData);

        const inhumadosResponse = await fetch("http://localhost:3000/inhumados");
        const inhumadosData: Inhumado[] = await inhumadosResponse.json();
        setInhumados(inhumadosData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setUsers([]);
        setInhumados([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.nombre.toLowerCase().includes(userSearch.toLowerCase()) ||
      user.apellido.toLowerCase().includes(userSearch.toLowerCase())
  );

  const filteredInhumados = inhumados.filter(
    (inhumado) =>
      inhumado.nombre.toLowerCase().includes(inhumadoSearch.toLowerCase()) ||
      inhumado.apellido.toLowerCase().includes(inhumadoSearch.toLowerCase())
  );

  const handleUserSelect = (userId: number) => {
    setSelectedUserId(selectedUserId === userId ? null : userId);
  };

  const handleInhumadoSelect = (inhumadoId: number) => {
    setSelectedInhumadoId(selectedInhumadoId === inhumadoId ? null : inhumadoId);
  };

  const handleRelacionar = async () => {
    if (!selectedUserId || !selectedInhumadoId) {
      if (!hasToastBeenShown) {
        toast.error("Debes seleccionar un usuario y un inhumado.");
        setHasToastBeenShown(true);
      }
      return;
    }

    const tokenData = localStorage.getItem("userSession");
    const parsedToken = tokenData ? JSON.parse(tokenData) : null;
    const token = parsedToken?.token;

    try {
      const response = await fetch("http://localhost:3000/usuario-inhumado", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          usuarioId: selectedUserId,
          inhumadoId: selectedInhumadoId,
        }),
      });

      if (!response.ok) {
        throw new Error("Error en la relación");
      }

      toast.success("Inhumado relacionado con éxito.");
      setSelectedUserId(null);
      setSelectedInhumadoId(null);
    } catch (error) {
      console.error("Error al relacionar:", error);
      toast.error("Hubo un problema al relacionar.");
    } finally {
      setHasToastBeenShown(false);
    }
  };

  if (loading) {
    return  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
  </div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Administración</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Users List */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2">Usuarios</h2>
          <input
            type="text"
            placeholder="Buscar usuario por nombre o apellido..."
            className="w-full p-2 border rounded mb-2"
            value={userSearch}
            onChange={(e) => setUserSearch(e.target.value)}
          />
          <div className="max-h-80 overflow-y-auto">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <div
                  key={user.idUser || `user-index-${index}`}
                  className={`p-2 border-b last:border-none cursor-pointer ${
                    selectedUserId === user.idUser ? "bg-blue-500 text-white font-bold" : ""
                  }`}
                  onClick={() => handleUserSelect(user.idUser)}
                >
                  {user.nombre || ""} {user.apellido || ""}
                </div>
              ))
            ) : (
              <div className="p-2 text-gray-500">No se encontraron usuarios</div>
            )}
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2">Inhumados</h2>
          <input
            type="text"
            placeholder="Buscar inhumado por nombre o apellido..."
            className="w-full p-2 border rounded mb-2"
            value={inhumadoSearch}
            onChange={(e) => setInhumadoSearch(e.target.value)}
          />
          <div className="max-h-80 overflow-y-auto">
            {filteredInhumados.length > 0 ? (
              filteredInhumados.map((inhumado, index) => (
                <div
                  key={inhumado.id || `inhumado-index-${index}`}
                  className={`p-2 border-b last:border-none cursor-pointer ${
                    selectedInhumadoId === inhumado.id ? "bg-green-500 text-white font-bold" : ""
                  }`}
                  onClick={() => handleInhumadoSelect(inhumado.id)}
                >
                  {inhumado.nombre || ""} {inhumado.apellido || ""}
                </div>
              ))
            ) : (
              <div className="p-2 text-gray-500">No se encontraron inhumados</div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 p-2 bg-gray-100 rounded-lg">
        <p className="text-center">
          Usuario seleccionado: <strong>{selectedUserId ? "ID " + selectedUserId : "Ninguno"}</strong>
          <br />
          Inhumado seleccionado: <strong>{selectedInhumadoId ? "ID " + selectedInhumadoId : "Ninguno"}</strong>
        </p>
      </div>

      <div className="text-center mt-4">
        <button
          onClick={handleRelacionar}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800 disabled:bg-gray-400"
          disabled={!selectedUserId || !selectedInhumadoId}
        >
          Relacionar Inhumado a Usuario
        </button>
      </div>
    </div>
  );
};

export default AdminUserInhumado;
