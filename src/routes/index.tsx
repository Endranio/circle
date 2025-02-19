import { HomePage } from '@/routes/home';
import { createBrowserRouter } from 'react-router-dom';

import { NotFound } from './404';
import { FollowsPage } from './follows';
import { ForgotPage } from './forgot-password';
import { LoginPage } from './login';
import { ProfilePage } from './profile';
import { RegisterPage } from './register';
import { ResetPage } from './reset-password';
import { SearchUserPage } from './search';

import { AppLayout } from '@/components/layouts/app-layout';
import { AuthLayout } from '@/components/layouts/auth-layout';
import ThreadDetailPage from './thread-detail';
import { CounterPage } from './counter';
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
        element: <SearchUserPage />,
      },
      {
        path: '/follows',
        element: <FollowsPage />,
      },
      {
        path: '/profile',
        element: <ProfilePage />,
      },
      {
        path: '/detail/:id',
        element: <ThreadDetailPage />,
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
  {
    path: '/test',
    element: <CounterPage />,
  },
]);
