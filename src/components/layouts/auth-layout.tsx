import Cookies from 'js-cookie';
import { Navigate, Outlet } from 'react-router-dom';

export function AuthLayout() {
  const token = Cookies.get('token');

  if (token) return <Navigate to={'/'} />;

  return <Outlet />;
}
