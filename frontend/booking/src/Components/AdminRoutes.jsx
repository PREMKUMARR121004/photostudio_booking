
import React from 'react'
import useAuth from '../Context/useAuth'
import { Navigate } from 'react-router-dom'

function AdminRoutes({ children }) {
  const { token, role } = useAuth()

  if (!token) {
    return <Navigate to="/login" replace />
  }

  if (role !== 'admin') {
    return <Navigate to="/" replace />
  }

  return children
}

export default AdminRoutes
