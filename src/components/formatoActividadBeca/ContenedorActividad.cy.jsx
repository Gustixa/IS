// see: https://on.cypress.io/mounting-react
import React from 'react'
import ContenedorActividad from './ContenedorActividad'

// Mock useAuthContext para proporcionar un valor simulado
Cypress.Commands.add('mockUseAuthContext', (authUser, setAuthUser, isLoggedIn, setIsLoggedIn) => {
  cy.window().then((win) => {
    // Crea un objeto simulado que imita la estructura de useAuthContext
    const mockedUseAuthContext = {
      authUser,
      setAuthUser,
      isLoggedIn,
      setIsLoggedIn
    };

    // Sustituye useAuthContext por el objeto simulado
    win.useAuthContext = () => mockedUseAuthContext;
  });
});

// see: https://on.cypress.io/mounting-react
describe('<ContenedorActividad />', () => {
  it('renders', () => {
    // Simula una actividad ficticia para pasarla como prop al componente
    const actividad = {
      id: 1,
      nombre_actividad: 'Actividad de ejemplo',
      descripcion: 'Descripción de la actividad',
      cupos_disponibles: 10,
      horas_acreditadas: 5,
    }
    
    // Simula una función onDelete ficticia
    const onDelete = (id) => {
      // Aquí puedes realizar cualquier acción que necesites para simular la eliminación de una actividad
      console.log(`Se eliminó la actividad con ID ${id}`);
    };

    // Llama al comando para simular useAuthContext con un usuario no autenticado (o autenticado, según tus necesidades)
    cy.mockUseAuthContext({
      type: true, // Puedes ajustar el tipo según tu caso de prueba
    });

    // Monta el componente con la actividad simulada
    cy.mount(<ContenedorActividad actividad={actividad} onDelete={onDelete} />)
  })
})
