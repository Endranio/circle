import { api } from '@/libs/api';
import { useAuthStore } from '@/stores/auth';

import axios from 'axios';
import { Navigate, Outlet } from 'react-router-dom';
import { toaster } from '../ui/toaster';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export function AuthLayout() {
  const { setUser } = useAuthStore();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  async function CheckAuth() {
    try {
      const token = Cookies.get('token');
      const response = await api.post(
        '/auth/check',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(response.data.data);
      setIsLoading(false);
    } catch (error) {
      Cookies.remove('token');
      if (axios.isAxiosError(error)) {
        return toaster.create({
          title: error.response?.data.message,
          type: 'error',
        });
      }

      toaster.create({
        title: `Something wrong`,
        type: 'error',
      });
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) CheckAuth();
  }, []);

  const { user } = useAuthStore();

  if (!isLoading && user) return <Navigate to={'/'} />;

  return <Outlet />;
}
