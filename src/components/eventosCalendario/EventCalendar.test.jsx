import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import EventCalendar from './EventCalendar'; // Update the path to your component

describe('EventCalendar', () => {
  it('renders EventCalendar component', () => {
    const onAddEventMock = jest.fn(); // Mocking the onAddEvent function
    render(<EventCalendar onAddEvent={onAddEventMock} />);

    // Check if the component renders
    const titleInput = screen.getByLabelText('Título del evento');
    expect(titleInput).toBeInTheDocument();

    // Mock user input data
    const mockEventData = {
      title: 'Test Event',
      startDate: '2023-08-15',
      startTime: '10:00',
      endDate: '2023-08-15',
      endTime: '12:00',
      description: 'Testing event description',
    };

    // Fill in the form fields
    fireEvent.change(screen.getByLabelText('Título del evento'), {
      target: { value: mockEventData.title },
    });
    fireEvent.change(screen.getByLabelText('Fecha de inicio'), {
      target: { value: mockEventData.startDate },
    });
    fireEvent.change(screen.getByLabelText('Hora de inicio'), {
      target: { value: mockEventData.startTime },
    });
    fireEvent.change(screen.getByLabelText('Fecha de finalización'), {
      target: { value: mockEventData.endDate },
    });
    fireEvent.change(screen.getByLabelText('Hora de finalización'), {
      target: { value: mockEventData.endTime },
    });
    fireEvent.change(screen.getByLabelText('Descripción'), {
      target: { value: mockEventData.description },
    });

    // Submit the form
    fireEvent.click(screen.getByText('Agregar evento'));

    // Check if onAddEventMock was called with the correct data
    expect(onAddEventMock).toHaveBeenCalledWith({
      title: mockEventData.title,
      start: expect.any(Date),
      end: expect.any(Date),
      description: mockEventData.description,
    });

    // Check if the form fields are reset
    expect(screen.getByLabelText('Título del evento')).toHaveValue('');
    // ... repeat for other fields

    // Check that the function was called only once
    expect(onAddEventMock).toHaveBeenCalledTimes(1);
  });
});
