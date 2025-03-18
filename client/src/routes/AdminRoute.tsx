import { Outlet } from 'react-router-dom';
import DynamicPageLoader from '@/components/ui/LazyCompoment';
import SecureRoute from './SecureRoute';

const authRoutes = {
  path: '',
  element: <Outlet />,
  children: [
    // Route sécurisée
    {
      path: '/dashboard',
      element: (
        <SecureRoute>
          <DynamicPageLoader pageKey="admin/Dashboard" />
        </SecureRoute>
      ),
    },
    {
      path: '/admin-menu',
      element: (
        <SecureRoute>
          <DynamicPageLoader pageKey="admin/Menu" />
        </SecureRoute>
      ),
    },
    {
      path: '/admin-avis',
      element: (
        <SecureRoute>
          <DynamicPageLoader pageKey="admin/Avis" />
        </SecureRoute>
      ),
    },{
      path: '/admin-reservation',
      element: (
        <SecureRoute>
          <DynamicPageLoader pageKey="admin/Reservation" />
        </SecureRoute>
      ),
    },{
      path: '/admin-commande',
      element: (
        <SecureRoute>
          <DynamicPageLoader pageKey="admin/Commande" />
        </SecureRoute>
      ),
    },
  ],
};

export default authRoutes;
