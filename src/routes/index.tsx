import { HomePage } from '@/routes/home';
import { createBrowserRouter } from 'react-router-dom';

import { AppLayout } from '@/components/ui/layouts/app-layout';
import { NotFound } from './404';
import { ForgotPage } from './forgot-password';
import { LoginPage } from './login';
import { RegisterPage } from './register';
import { ResetPage } from './reset-password';
import { FollowsPage } from './follows';
import { ProfilePage } from './profile';
import { SearchPage } from './search';
import { AuthLayout } from '@/components/ui/layouts/auth-layout';
export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/search',
        element: <SearchPage />,
      },
      {
        path: '/follows',
        element: <FollowsPage />,
      },
      {
        path: '/profile',
        element: <ProfilePage />,
      },
    ],
  },

  {
    element: <AuthLayout />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/register',
        element: <RegisterPage />,
      },
      {
        path: '/forgot-password',
        element: <ForgotPage />,
      },
      {
        path: '/reset-password',
        element: <ResetPage />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
