
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import useAuth from '../Context/useAuth'

function ProtectedRoutes({ children }) {
  const { token, role } = useAuth()
  const location = useLocation()

  if (!token) {
    return (
      <Navigate
        to="/login"
        state={{ from: location.pathname }}
        replace
      />
    )
  }

  if (role === 'admin') {
    return <Navigate to="/admin/dashboard" replace />
  }

  return children
}

export default ProtectedRoutes
