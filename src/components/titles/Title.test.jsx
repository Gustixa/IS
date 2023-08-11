import React from 'react';
import { render, screen } from '@testing-library/react';
import Title from './Title'; // Update the path to your component

test('renders Title component', () => {
  const mockTitles = ['Title 1', 'Title 2', 'Title 3']; // Mock titles
  render(<Title titles={mockTitles} />);
  
  // Check if the component renders
  const titleElements = screen.getAllByText(/Title \d/); // Check for titles with a pattern
  expect(titleElements.length).toBe(mockTitles.length);
});
