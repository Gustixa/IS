import React, { useState} from 'react'
import { renderWithContext } from '@test/utils'
import LogIn from './LogIn'
import { expect } from '@test/setUpTests'
import { AuthProvider } from '@contexts/AuthContext'
import { fireEvent } from '@testing-library/react'

test('Debería mostrar mensaje de error si no se ingresa el correo', () => {
  const { getByText } = renderWithContext(
    <LogIn />
    ,<AuthProvider
      value={{
        authUser: null, 
        setAuthUser: () => {}, 
        isLoggedIn: false, 
        setIsLoggedIn: () => {}       
    }}>
    <LogIn/>
  </AuthProvider>
  )
  
  fireEvent.click(getByText('Iniciar Sesión'))

  expect(getByText('Debe ingresar un valor en el campo')).toBeInTheDocument()
})

test('Debería mostrar mensaje de error si no se ingresa la contraseña', () => {
  const { getByText }   = renderWithContext(<LogIn />, {
    authUser: null, 
    setAuthUser: () => {},   
    isLoggedIn: false,
    setIsLoggedIn: () => {}
   })

  fireEvent.change(getByLabelText('Correo electronico'), {
    target: { value: 'test@example.com' }
  })
  fireEvent.click(getByText('Iniciar Sesión'))

  expect(getByText('Debe ingresar un valor en el campo')).toBeInTheDocument()
})  

test('Debería iniciar sesión correctamente con credenciales válidas', () => {
 // Agregar credenciales válidas   
 // Mockear supabase.from() para devolver usuario           
 fireEvent.click(getByText('Iniciar Sesión'))

 // Verificar que el estado se actualizó y redireccióna al dashboard
})  

test('Debería mostrar un mensaje de error si el correo no existe', () => { 
  // Mockear supabase.from() para no devolver ningún usuario
   // Verificar mensaje de error
})

// ... Otros tests