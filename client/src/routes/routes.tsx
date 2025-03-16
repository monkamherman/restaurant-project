import { createBrowserRouter, Outlet } from 'react-router-dom'
import Navbar from '@/layouts/navbar/Header'
import Footer from '@/layouts/footer/Footer'
// import authRoutes from './routes-config/authRoutes'
// import ScrollProgress from '@/components/ui/scroll-progress'
import ScrollToTop from '@/components/ui/ScrollToTop'
import DynamicPageLoader from '@/components/ui/LazyCompoment'
import AboutUsPage from '@/pages/about/About'
import MenuPage from '@/pages/menu/Menu'

/**
 * Creates a router with specified routes and elements for each route.
 * @param {Array} routes - An array of route objects containing path and element information.
 * @returns None
 */

const Router = createBrowserRouter([
	{
		path: '',
		element: (
			<>
				<Outlet />

				{/* To scroll to top each time that we change routes */}
				<ScrollToTop />
			</>
		),

		// Page erreur
		errorElement: <DynamicPageLoader pageKey="error/PageError" />,

		children: [
			{
				path: '/',
				element: <>
					<Navbar />
					<div className='min-h-[80vh] md:p-8 p-4 dark:bg-dark dark:border-t-2 border-color'>
						<Outlet />
					</div>
					<Footer />
				</>,
				children: [
					{
						path: '/',
						element: <DynamicPageLoader pageKey="home/Home" />
					},
					{
						path: '/about',
						element:<>
						 <AboutUsPage/>
						 </>
					},
					{
						path: '/menu',
						element:<>
						 <MenuPage/>
						 </>
					}


					// Authentication routes part
					// authRoutes,
				]
			},
		],
	},
])

export default Router
