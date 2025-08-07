import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const isAuth = !!localStorage.getItem('token');
  return isAuth ? children : <Navigate to="/signin" />;
}
