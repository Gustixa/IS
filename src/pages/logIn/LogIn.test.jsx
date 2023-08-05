// LogIn.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LogIn from './LogIn';
import { AuthContext } from '@contexts/AuthContext'; // Asegúrate de importar el contexto correcto

// Creamos una función de utilidad para renderizar el componente con el contexto de autenticación
const renderWithContext = (component, value) => {
  return render(<AuthContext.Provider value={value}>{component}</AuthContext.Provider>);
};

test('Debería mostrar mensaje de error si no se ingresa el correo', () => {
  // Renderizamos el componente sin iniciar sesión
  const { getByLabelText, getByText } = renderWithContext(<LogIn />, {
    authUser: null, // Cambia esto según el valor que corresponda a tu aplicación
    setAuthUser: jest.fn(),
    isLoggedIn: false, // Cambia esto según el valor que corresponda a tu aplicación
    setIsLoggedIn: jest.fn(),
  });

  // Simulamos un clic en el botón de inicio de sesión sin ingresar el correo
  fireEvent.click(getByText('Iniciar Sesión'));

  // Verificamos que se muestre el mensaje de error
  expect(getByText('Debe ingresar un valor en el campo')).toBeInTheDocument();
});

test('Debería mostrar mensaje de error si no se ingresa la contraseña', () => {
  // Renderizamos el componente sin iniciar sesión
  const { getByLabelText, getByText } = renderWithContext(<LogIn />, {
    authUser: null, // Cambia esto según el valor que corresponda a tu aplicación
    setAuthUser: jest.fn(),
    isLoggedIn: false, // Cambia esto según el valor que corresponda a tu aplicación
    setIsLoggedIn: jest.fn(),
  });

  // Ingresamos un correo para pasar la validación previa
  fireEvent.change(getByLabelText('Correo electronico'), { target: { value: 'correo@example.com' } });

  // Simulamos un clic en el botón de inicio de sesión sin ingresar la contraseña
  fireEvent.click(getByText('Iniciar Sesión'));

  // Verificamos que se muestre el mensaje de error
  expect(getByText('Debe ingresar un valor en el campo')).toBeInTheDocument();
});

test('Debería mostrar mensaje de error si el correo no es válido', () => {
  // Renderizamos el componente sin iniciar sesión
  const { getByLabelText, getByText } = renderWithContext(<LogIn />, {
    authUser: null, // Cambia esto según el valor que corresponda a tu aplicación
    setAuthUser: jest.fn(),
    isLoggedIn: false, // Cambia esto según el valor que corresponda a tu aplicación
    setIsLoggedIn: jest.fn(),
  });

  // Ingresamos una contraseña para pasar la validación previa
  fireEvent.change(getByLabelText('Contraseña'), { target: { value: 'secreta123' } });

  // Simulamos un clic en el botón de inicio de sesión sin ingresar un correo válido
  fireEvent.click(getByText('Iniciar Sesión'));

  // Verificamos que se muestre el mensaje de error
  expect(getByText('El correo es invalido. Verifique nuevamente.')).toBeInTheDocument();
});

// Agrega más pruebas según tus requerimientos
