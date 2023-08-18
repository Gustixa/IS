import React, {
  createContext, useState, useContext, useMemo, useEffect,
} from 'react'
import PropTypes from 'prop-types'

const AuthContext = createContext()

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe ser utilizado dentro de un AuthProvider')
  }
  return context
}

export function useAuthContext() {
  return useContext(AuthContext)
}

function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // Verificar si hay información de usuario almacenada en localStorage al cargar la página
    const storedUser = localStorage.getItem('authUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setAuthUser(parsedUser);
      setIsLoggedIn(true);
    }
  }, []);

  const logout = () => {
    // Restablecer la información de usuario y el estado de inicio de sesión al cerrar sesión
    localStorage.removeItem('authUser');
    setAuthUser(null);
    setIsLoggedIn(false);
  };

  const value = useMemo(() => ({
    authUser,
    setAuthUser,
    isLoggedIn,
    setIsLoggedIn,
    logout,
  }), [authUser, setAuthUser, isLoggedIn, setIsLoggedIn]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider }

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
