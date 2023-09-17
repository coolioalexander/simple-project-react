import { createBrowserRouter, RouterProvider, defer } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage';
import ProductPage from './pages/ProductPage';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import App from './App';
import { lazy, Suspense } from 'react';
import { ContactPage } from './pages/ContactPage';
import ThankPage from './pages/ThankPage';
import BlogPage from './pages/BlogPage';
import { getPosts } from './posts/api';
import { useQueryClient } from '@tanstack/react-query';
const AdminPage = lazy(() => import('./pages/AdminPage'));

export default function Routes() {
  const queryClient = useQueryClient();

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
          loader: async () => {
            const posts = queryClient.getQueryData(['posts']);
            if (posts) {
              return defer({ posts: posts });
            }
            return defer({ posts: queryClient.fetchQuery(['posts'], getPosts) });
          },
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
