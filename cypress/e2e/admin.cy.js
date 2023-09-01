describe('admin functionality', () => {
    it('logIn', () => {
      cy.visit("/")
      // Verificacion del email
      cy.get('#email').type("arg211024@uvg.edu.gt")
      // Verificacion de la contraseaña
      cy.get('#password').type("211024")
      // Prueba de boton
      cy.get('._buttonPosition_vf6ok_145 > .MuiButtonBase-root').click()
    })

    it('mainPage', () => {
        // Main page estudiante
        cy.get('#menuIcono').click()

        cy.get(':nth-child(2) > .MuiButtonBase-root').click()
    
        // Cerrar sesion
        cy.get('#menuIcono').as("button").click()
        cy.get(':nth-child(3) > .MuiList-root > .MuiListItem-root > .MuiButtonBase-root').click()
    })

    
  })