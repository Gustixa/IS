import { render, screen, fireEvent, context } from '@testing-library/jest-dom'
import {vi} from 'vitest'
import CrearActividad from './CrearActividad'
import { supabase } from '@db-supabase/supabase.config'

// Simulamos el contexto de autenticación
context.mock('@contexts/AuthContext', () => ({
  useAuthContext: () => ({
    authUser: {},
    setAuthUser: vi.fn(),
    isLoggedIn: false,
    setIsLoggedIn: vi.fn(),
  })
}))

// Simulamos el módulo supabase
context.mock('@db-supabase/supabase.config', () => ({
  supabase: {
    from: vi.fn(() => ({
      insert: vi.fn(() => ({
        data: [{ id: 1 }],
        error: null,
      }))
    }))
  }
}))

describe('CrearActividad', () => {
  it('shows error messages when fields are empty', async () => {
    render(<CrearActividad />)
    await fireEvent.click(screen.getByText('Agregar'))

    expect(screen.getByText('Debe ingresar el nombre de la actividad')).toBeInTheDocument()
    // ... otras assertions para los demás campos vacíos
  })

  it('submits the form when all fields are valid', async () => {
    render(<CrearActividad />)
    await fireEvent.change(screen.getByLabelText('Nombre de la Actividad'), { target: { value: 'actividad test' } })
    // ... cambiar valores de los demás campos

    await fireEvent.click(screen.getByText('Agregar'))

    // Verificar que la inserción en supabase se realizó correctamente
    expect(supabase.from().insert).toHaveBeenCalledWith([
      {
        nombre_actividad: 'actividad test'
      },
    ])
  })
})
