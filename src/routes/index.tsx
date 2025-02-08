import { HomePage } from '@/routes/home';
import { createBrowserRouter } from 'react-router-dom';

import { AppLayout } from '@/components/ui/layouts/app-layout';
import { Box } from '@chakra-ui/react';
import { NotFound } from './404';
import { ForgotPage } from './forgot-password';
import { LoginPage } from './login';
import { RegisterPage } from './register';
import { ResetPage } from './reset-password';
export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Box>
        <AppLayout>
          <HomePage />
        </AppLayout>
      </Box>
    ),
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
    path: '/forgot-password',
    element: <ForgotPage />,
  },
  {
    path: '/reset-password',
    element: <ResetPage />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
