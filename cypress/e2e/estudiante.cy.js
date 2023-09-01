describe('estudiante function', () => {
  it('log in, log out', () => {
    cy.visit("/")
    // Verificacion del email
    cy.get('#email').type("arg211024@uvg.edu.gt")
    // Verificacion de la contraseaña
    cy.get('#password').type("211024")
    // Prueba de boton
    cy.get('._buttonPosition_vf6ok_145 > .MuiButtonBase-root').click()

    // Cerrar sesion
    cy.get('#menuIcono').as("button").click()
    cy.get(':nth-child(3) > .MuiList-root > .MuiListItem-root > .MuiButtonBase-root').click()
  })

  it("Usuario invalido", () => {
    cy.visit("/")
    // Verificacion del email
    cy.get('#email').type("josuehernandez@gmail.com")
    
    // Verificacion de la contraseaña
    cy.get('#password').type("211024")
    // Prueba de boton
    cy.get('._buttonPosition_vf6ok_145 > .MuiButtonBase-root').click()
    cy.get('#email-helper-text').should("include.text", "El correo es inválido")
  })

  it("Contraseña invalida", () => {
    cy.visit("/")
    // Verificacion del email
    cy.get('#email').type("arg211024@uvg.edu.gt")
    
    // Verificacion de la contraseaña
    cy.get('#password').type("2110")
    // Prueba de boton
    cy.get('._buttonPosition_vf6ok_145 > .MuiButtonBase-root').click()
    cy.get('#password-helper-text').should("include.text", "La contraseña es inválida")
  })

  it("Navegacion pagina principal", () => {
    cy.visit("/")
    // Verificacion del email
    cy.get('#email').type("arg211024@uvg.edu.gt")
    // Verificacion de la contraseaña
    cy.get('#password').type("211024")
    // Prueba de boton
    cy.get('._buttonPosition_vf6ok_145 > .MuiButtonBase-root').click()

    // navegar a actividades beca
    cy.get('#menuIcono').as("button").click()
    cy.get(':nth-child(2) > .MuiButtonBase-root').click()

    // filtrar actividades
    cy.get('#filtroActividades').type("test")
    cy.get('#tituloActividad').should("include.text","Test")

  })
})