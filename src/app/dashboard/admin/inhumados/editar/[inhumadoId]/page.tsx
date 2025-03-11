'use client'

import React from 'react'
import AdminInhumadosEditView from '@/app/dashboard/views/AdminInhumadoEditView'
import { useParams } from 'next/navigation';


const AdminInhumadosEdit = () => {
      const params = useParams();
      const inhumadoId = Array.isArray(params.inhumadoId) ? params.inhumadoId[0] : params.inhumadoId || '';

  return (
    <>
   
   <AdminInhumadosEditView params={{ inhumadoId }} />
    
    </>
  )
}

export default AdminInhumadosEdit