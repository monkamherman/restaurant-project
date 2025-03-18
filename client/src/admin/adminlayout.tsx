// AdminLayout.jsx
import { Outlet } from 'react-router-dom';

const AdminLayout = () => (
  <div className="admin-container">
    <AdminSidebar />
    <main>
      <AdminNavbar />
      <Outlet /> {/* Contenu dynamique ici */}
    </main>
  </div>
);


exporte default AdminLayout