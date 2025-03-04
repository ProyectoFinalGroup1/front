"use client";
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';


const DashboardAdminView = () => {
     
    const { userData } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirige si no es un admin
    if (!userData || userData?.user?.isAdmin !== true) {
      router.push('/'); // Redirige al inicio o a un acceso no autorizado
    }
  }, [userData, router]);

  if (!userData || userData?.user?.isAdmin !== true) {
    return null; // O una pantalla de carga/espera mientras se verifica el rol
  }
  


    return (
      <div className="p-6">
        <h1 className="text-3xl font-semibold text-gray-800">Bienvenido al Dashboard</h1>
        <p className="mt-2 text-gray-600">Aquí puedes ver estadísticas y gestionar tu cuenta.</p>
      </div>
    );
  };
  
  export default DashboardAdminView;
  