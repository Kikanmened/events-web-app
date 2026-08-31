import { Navigate, Outlet } from 'react-router'
import { getToken } from '../utils/auth'

function ProtectedRoute() {
  const token = getToken()

  if (!token) {
    return <Navigate to="/signin" replace />
  }

  return <Outlet />
}

export default ProtectedRoute