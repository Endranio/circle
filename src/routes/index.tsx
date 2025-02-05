import { DashboardPage } from '@/routes/dashboard';
import { createBrowserRouter } from 'react-router-dom';

import { NotFound } from './404';
import { LoginPage } from './login';
import { RegisterPage } from './register';
export const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
