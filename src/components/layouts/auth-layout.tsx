import { IsLogin } from '@/utils/sesions/sesion';
import { Navigate, Outlet } from 'react-router-dom';

export function AuthLayout() {
  if (IsLogin) return <Navigate to={'/'} />;
  return <Outlet />;
}
