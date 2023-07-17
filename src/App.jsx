import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Routing from '@routers/Routing'
import { AuthProvider } from '@contexts/AuthContext'

function App() {
  return (
    <>
      <AuthProvider>
        <Routing/>  
      </AuthProvider>
    </>
  )
}

export default App
