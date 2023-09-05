import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Becarios from './Becarios';

jest.mock('@db-supabase/supabase.config', () => ({
  supabase: {
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        data: [],
        error: 'Mocked error',
      })),
    })),
  },
}));

describe('Becarios Component', () => {
  it('renders without crashing', () => {
    render(<Becarios />);
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
  });

  it('fetches data on mount and handles error', async () => {
    render(<Becarios />);
    await waitFor(() => expect(screen.getByText('Error fetching data: Mocked error')).toBeInTheDocument());
  });

  it('displays filtered data', async () => {
    jest.clearAllMocks(); // Limpiar mocks para simular una respuesta exitosa
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce([
        {
          id: 1,
          nombre_estudiante: 'Estudiante1',
          carnet: '12345',
        },
      ]),
    });

    render(<Becarios />);
    await waitFor(() => expect(screen.getByText('Estudiante1')).toBeInTheDocument());
  });
});
