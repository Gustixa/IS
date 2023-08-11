import React from 'react';
import { render, screen } from '@testing-library/react';
import ContenedorActividad from './ContenedorActividad';

test('renders ContenedorActividad component', () => {
  render(<ContenedorActividad />);
  
  // Check if the component renders
  const textContent = screen.getByText('Nada=6');
  expect(textContent).toBeInTheDocument();
});
