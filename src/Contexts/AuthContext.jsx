import React, {
  createContext, useState, useContext, useMemo,
} from 'react'
import PropTypes from 'prop-types'

const AuthContext = createContext()
// Hook para iniciazliar el contexto
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe ser utilizado dentro de un AuthProvider')
  }
  return context
}
/**
 * Hook para devolver los datos del contexto
 * En este caso, para devolver la sesion actual
 * @returns
 */
export function useAuthContext() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Memorizamos el valor del contexto con useMemo
  const value = useMemo(() => ({
    authUser,
    setAuthUser,
    isLoggedIn,
    setIsLoggedIn,
  }), [authUser, setAuthUser, isLoggedIn, setIsLoggedIn])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
