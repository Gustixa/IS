import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Calendario from './Calendar';

test('renders Calendario component', () => {
  render(<Calendario />);
  
  // Check if the component renders
  const headerText = screen.getByText('Calendario');
  expect(headerText).toBeInTheDocument();

  // Mock authUser data
  const mockAuthUser = { type: 'admin' };
  jest.mock('@contexts/AuthContext', () => ({
    useAuthContext: () => ({ authUser: mockAuthUser }),
  }));

  // Mock EventCalendar component
  jest.mock('@components/eventosCalendario', () => () => <div>Mock EventCalendar</div>);

  // Open the dialog
  fireEvent.click(screen.getByText('Actividad Beca'));

  // Check if the dialog content renders for admin
  const dialogContentAdmin = screen.getByText('Detalles de la actividad');
  expect(dialogContentAdmin).toBeInTheDocument();
  const eventCalendarMock = screen.getByText('Mock EventCalendar');
  expect(eventCalendarMock).toBeInTheDocument();

  // Close the dialog
  fireEvent.click(screen.getByText('Cancelar'));
  
  // Reopen the dialog with a different authUser type
  mockAuthUser.type = 'estudiante';
  fireEvent.click(screen.getByText('Actividad Beca'));

  // Check if the dialog content renders for estudiante
  const dialogContentEstudiante = screen.getByText('No se ha seleccionado ninguna actividad o el usuario no es un estudiante.');
  expect(dialogContentEstudiante).toBeInTheDocument();
});
