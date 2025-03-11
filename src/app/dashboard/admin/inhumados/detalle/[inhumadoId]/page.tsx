'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import AdminInhumadosDetailview from '@/app/dashboard/views/AdminInhumadoDetailView';

const AdminInhumadosDetail = () => {
  // Obtener el ID dinámico desde los parámetros de la URL
  const params = useParams();
  const inhumadoId = Array.isArray(params.inhumadoId) ? params.inhumadoId[0] : params.inhumadoId || '';
  
  return (
    <>
      <AdminInhumadosDetailview params={{ inhumadoId }} />
    </>
  );
};

export default AdminInhumadosDetail;