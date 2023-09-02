describe('admin functionality', () => {
    it('logIn', () => {
      cy.visit("/")
      // Verificacion del email
      cy.get('#email').type("adgarcia@uvg.edu.gt")
      // Verificacion de la contraseaña
      cy.get('#password').type("2023")
      // Prueba de boton
      cy.get('._buttonPosition_vf6ok_145 > .MuiButtonBase-root').click()

      // Cerrar sesion
      cy.get('#menuIcono').as("button").click()
      cy.get(':nth-child(3) > .MuiList-root > .MuiListItem-root > .MuiButtonBase-root').click()
    })

    it('mainPage', () => {
        cy.visit("/")
        // Verificacion del email
        cy.get('#email').type("adgarcia@uvg.edu.gt")
        // Verificacion de la contraseaña
        cy.get('#password').type("2023")
        // Prueba de boton
        cy.get('._buttonPosition_vf6ok_145 > .MuiButtonBase-root').click()
        cy.get('#menuIcono').as("button").click()
        cy.get('.MuiPaper-root > .MuiBox-root > :nth-child(1) > :nth-child(1) > .MuiButtonBase-root').click()

    })

    it("filtrado", () => {
      cy.visit("/")
      // Verificacion del email
      cy.get('#email').type("adgarcia@uvg.edu.gt")
      // Verificacion de la contraseaña
      cy.get('#password').type("2023")
      // Prueba de boton
      cy.get('._buttonPosition_vf6ok_145 > .MuiButtonBase-root').click()
      cy.get('#filterCarne').type("211024")

      cy.get('.MuiTableBody-root > .MuiTableRow-root > :nth-child(2)').should("have.text", "211024")
    })
    
  })