import React from 'react'
import Routing from './Routing'

describe('<Routing />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Routing />)
  })
})