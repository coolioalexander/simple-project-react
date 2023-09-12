import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage';
import ProductPage from './pages/ProductPage';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import App from './App';
import { lazy, Suspense } from 'react';
import { ContactPage } from './pages/ContactPage';
import ThankPage from './pages/ThankPage';
import BlogPage from './pages/BlogPage';
const AdminPage = lazy(() => import('./pages/AdminPage'));

export default function Routes() {
  const loading = <div className="text-center p-5 text-base text-slate-900">Loading...</div>;

  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: 'products',
          element: <ProductsPage />,
        },
        {
          path: 'products/:id',
          element: <ProductPage />,
        },
        {
          path: 'blog',
          element: <BlogPage />,
        },
        {
          path: 'admin',
          element: (
            <Suspense fallback={loading}>
              <AdminPage />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: '/contact',
      element: <ContactPage />,
      errorElement: <ErrorPage />,
    },
    {
      path: '/thank/:name',
      element: <ThankPage />,
      errorElement: <ErrorPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}
