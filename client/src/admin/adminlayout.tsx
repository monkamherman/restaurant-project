// AdminLayout.jsx
import { Outlet } from 'react-router-dom';
import AdminHeader from '@/pages/admin/component/AdminHeader';

const AdminLayout = () => (
  <div className="admin-container bg-dark">
      <AdminHeader />
    <main>
      <Outlet /> {/* Contenu dynamique ici */}
    </main>
  </div>
);


export default AdminLayout