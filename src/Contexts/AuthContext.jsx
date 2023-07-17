import React, { createContext, useState, useContext, useEffect } from 'react'

const AuthContext = createContext()
// Hook para iniciazliar el contexto
export function useAuth() {
  const context = useContext(AuthContext)
  if(!context){
    throw new Error('useAuth debe ser utilizado dentro de un AuthProvider')
  }
  return context
}
/**
 * Hook para devolver los datos del contexto
 * En este caso, para devolver la sesion actual
 * @returns 
 */
export function useAuthContext(){
  return useContext(AuthContext)
}


export function AuthProvider(props) {
  const [authUser, setAuthUser] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const value = {
    authUser,
    setAuthUser,
    isLoggedIn,
    setIsLoggedIn
  }

  return (
    <AuthContext.Provider value={value}>
      {props.children}
    </AuthContext.Provider>
  )

}