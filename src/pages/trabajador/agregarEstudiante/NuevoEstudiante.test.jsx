import { render, screen, fireEvent, context } from '@testing-library/jest-dom'
import {vi} from 'vitest'
import NuevoEstudiante from './NuevoEstudiante'
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

describe('NuevoEstudiante', () => {
  it('shows error messages when fields are empty', async () => {
    render(<NuevoEstudiante />)
    await fireEvent.click(screen.getByText('Agregar'))

    expect(screen.getByText('Debe ingresar el nombre del estudiante')).toBeInTheDocument()
    // ... otras assertions para los demás campos vacíos
  })

  it('submits the form when all fields are valid', async () => {
    render(<NuevoEstudiante />)
    await fireEvent.change(screen.getByLabelText('Nombre del Estudiante'), { target: { value: 'John Doe' } })
    // ... cambiar valores de los demás campos

    await fireEvent.click(screen.getByText('Agregar'))

    // Verificar que la inserción en supabase se realizó correctamente
    expect(supabase.from().insert).toHaveBeenCalledWith([
      {
        cantidad_beca: '1000',
        cantidad_credito: '2000',
        carrera: 'Computer Science',
        facultad: 'Engineering',
        anio: '2023',
        horas_acumuladas: '0',
        nombre_estudiante: 'John Doe',
        carnet: '12345',
        correo: 'john@example.com',
        password: 'password123',
      },
    ])
  })
})
