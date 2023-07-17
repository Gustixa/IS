import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuthContext } from '@contexts/AuthContext'

export default function ProtectedRoute({children}){
  const { isLoggedIn } = useAuthContext();
  const location = useLocation();
  // Verificacion si el usuario ha iniciado sesion
  if (!isLoggedIn && location.pathname !== '/logIn') {
    // De no haber, redirecciona a logIn automaticamente
    return <Navigate to="/logIn" />;
  }
  return (
    <>{children}</>
  )
}