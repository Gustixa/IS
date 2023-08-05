import React from 'react'
import Routing from '@routers/Routing'
import { AuthProvider } from '@contexts/AuthContext'

function App() {
  //"test": "vitest --ui"
  return (
    <AuthProvider>
      <Routing />
    </AuthProvider>
  )
}

export default App
