import { AuthProvider } from '@contexts/AuthContext'
import { render } from '@testing-library/react'

export function renderWithContext(ui, context) {
  return {
    ...render(
      <AuthProvider value={context}>
         {ui}  
      </AuthProvider>  
    ),
  } 
}