import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import Routing from './Routing';

describe('Routing Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
    );
    expect(screen.getByTestId('your-test-id')).toBeInTheDocument(); // Asegúrate de ajustar el test ID según la estructura de tu componente
  });

  it('navigates to LogIn page', () => {
    render(
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
    );
    userEvent.click(screen.getByText('Log In'));
    expect(screen.getByTestId('logIn-page')).toBeInTheDocument(); // Ajusta según la estructura de tu componente LogIn
  });
});
