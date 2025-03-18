import { createBrowserRouter, Outlet } from 'react-router-dom';
import Navbar from '@/layouts/navbar/Header';
import Footer from '@/layouts/footer/Footer';
import ScrollToTop from '@/components/ui/ScrollToTop';
import DynamicPageLoader from '@/components/ui/LazyCompoment';
import AboutUsPage from '@/pages/about/About';
import MenuPage from '@/pages/menu/Menu';
import SecureRoute from './SecureRoute'; // Importez SecureRoute

const isAuthenticated = true; // Remplacez par votre logique d'authentification

const Router = createBrowserRouter([
  {
    path: '',
    element: (
      <>
        <Outlet />
        <ScrollToTop />
      </>
    ),
    errorElement: <DynamicPageLoader pageKey="error/PageError" />,
    children: [
      {
        path: '/',
        element: (
          <>
            <Navbar />
            <div className='min-h-[80vh] md:p-8 p-4 dark:bg-dark dark:border-t-2 border-color'>
              <Outlet />
            </div>
            <Footer />
          </>
        ),
        children: [
          {
            path: '/',
            element: <DynamicPageLoader pageKey="home/Home" />,
          },
          {
            path: '/about',
            element: <AboutUsPage />,
          },
          {
            path: '/menu',
            element: <MenuPage />,
          },

		  {
			path: '/login',
			element: <DynamicPageLoader pageKey="auth/Login" />,
		  },
          // Route sécurisée
          {
            path: '/dashboard',
            element: (
              <SecureRoute isAuthenticated={isAuthenticated} redirectPath="/login">
                <DynamicPageLoader pageKey="dashboard/Dashboard" />
              </SecureRoute>
            ),
          },
        ],
      },
    ],
  },
]);

export default Router;