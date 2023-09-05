import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import ActividadBeca from './ActividadBeca';

jest.mock('@db-supabase/supabase.config', () => ({
  supabase: {
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        data: null,
        error: 'Mocked error',
      })),
    })),
  },
}));

describe('ActividadBeca Component', () => {
  it('renders without crashing', () => {
    render(<ActividadBeca />);
    expect(screen.getByTestId('actividad-beca')).toBeInTheDocument();
  });

  it('fetches data on mount and handles error', async () => {
    render(<ActividadBeca />);
    await waitFor(() => expect(screen.getByText('No se pudo obtener la informacion de la base de datos.')).toBeInTheDocument());
  });

  it('displays fetched data', async () => {
    jest.clearAllMocks(); // Limpiar mocks para simular una respuesta exitosa
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({ data: 'mocked data' }),
    });

    render(<ActividadBeca />);
    await waitFor(() => expect(screen.getByText('mocked data')).toBeInTheDocument());
  });

  it('renders SideBar and ContenedorActividad components', async () => {
    render(<ActividadBeca />);
    await waitFor(() => {
      expect(screen.getByTestId('sidebar')).toBeInTheDocument();
      expect(screen.getByTestId('contenedor-actividad')).toBeInTheDocument();
    });
  });
});
