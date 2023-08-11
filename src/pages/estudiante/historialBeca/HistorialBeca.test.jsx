import React from 'react';
import { render, screen } from '@testing-library/react';
import HistorialBeca from './HistorialBeca'; // Update the path to your component

test('renders HistorialBeca component', () => {
  render(<HistorialBeca />);
  
  // Check if the component renders
  const sideBar = screen.getByRole('navigation');
  expect(sideBar).toBeInTheDocument();

  // Check if the Title component renders
  const titleComponent = screen.getByRole('heading', { name: /title/i });
  expect(titleComponent).toBeInTheDocument();
});
