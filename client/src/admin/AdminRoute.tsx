import React from 'react'
import  SecureRoute  from '../routes/SecureRoute'
import AdminLayout from '@/admin/adminlayout'

const AdminRoute: React.FC = () => {
  return (
    <div>
      <SecureRoute>
        <AdminLayout/>
      </SecureRoute>
    </div>
  )
}

export default AdminRoute;