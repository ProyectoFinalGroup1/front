"use client";
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Calendario from '@/app/dashboard/components/calendario';

const DashboardAdminView = () => {
  const { userData, setUserData } = useAuth()
   
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
    setLoading(false);
  }, [setUserData]);

  useEffect(() => {
    if (!loading && (!userData || userData?.user?.isAdmin !== true)) {
      router.push("/"); // Redirige al inicio
    }
  }, [loading, userData, router]);

  if (loading) {
    return <p>Cargando...</p>; // Muestra algo mientras se carga la info
  }

  if (!userData || userData?.user?.isAdmin !== true) {
    return null;
  }

    return (
      <div className="p-6">
        <h1 className="text-3xl font-semibold">Bienvenido al Panel de Gestiones de Valle de Paz</h1>
        <p className="mt-2">Aquí puedes ver estadísticas, gestionar usuarios y citas con clientes.</p>
        <Calendario />
      </div>
    );
  }
  
  export default DashboardAdminView;
  