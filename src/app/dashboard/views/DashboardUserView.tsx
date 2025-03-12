'use client'
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useAuth } from "@/context/AuthContext"; 

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const DashboardUserView = () => {
  const { userData } = useAuth(); 

  
  const [newsletter, setNewsletter] = useState(false);
  

  
  useEffect(() => {
    if (userData) {
      setNewsletter(userData.user.recibirRecordatoriosAniversarios || false);
      

    }
  }, [userData]);

  
  const handleToggle = async (preference: string, value: boolean) => {
    try {
      const res = await fetch(`${API_URL}/user/${userData?.user.idUser}/preferences`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userData?.token}`, 
        },
        body: JSON.stringify({ [preference]: value }),
      });

      if (!res.ok) throw new Error("Error al actualizar preferencias");

      if (preference === "recibirRecordatoriosAniversarios") {
        setNewsletter(value);
      } else if (preference === "fechaPago") {
     
      }

      toast.success("Preferencia actualizada correctamente");
    } catch (error) {
      console.error(error); // Esto evita el warning
  toast.error("Hubo un problema al actualizar las preferencias.");
 
    }
  };

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold">Bienvenido a Valle de Paz</h1>
      <p className="mt-2 text-lg">Personaliza tu experiencia en esta sección.</p>

      <div className="mt-6 space-y-6">
        
        <div className="flex items-center justify-between p-4 bg-white shadow-md rounded-lg">
          <span className="font-medium">📩 Recibir Recordatorios de Aniversarios de sus Seres Queridos </span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={newsletter}
              onChange={() => handleToggle("recibirRecordatoriosAniversarios", !newsletter)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-300 rounded-full border border-gray-400 shadow-inner peer-checked:bg-green-500 transition-all relative">
              <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
            </div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 peer-checked:bg-green-500 bg-white shadow-md rounded-lg">
          <span className="font-medium">🔔 Recibir Notificaciones de Pagos:</span>
          <label className="relative inline-flex items-center cursor-pointer">
          <input
    checked={true} 
    readOnly 
    onClick={() =>
    toast.error("Las notificaciones de pago son obligatorias y no pueden desactivarse. 😊")
  }
/>
            <div className="w-11 h-6 bg-green-500 rounded-full peer-checked:bg-green-500 transition-all relative">
              <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default DashboardUserView;



