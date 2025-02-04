import { createBrowserRouter } from 'react-router-dom';
import { DashboardPage } from '@/routes/dashboard';
import { AboutPage } from '@/routes/abaut';
import { NotFound } from './404';
export const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardPage />,
  },
  {
    path: '/about',
    element: <AboutPage />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
