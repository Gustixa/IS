import React, { useState} from 'react'
import { renderWithContext } from '@test/utils'
import { render } from "@testing-library/react"
import LogIn from './LogIn'
import { expect } from '@test/setUpTests'
import { AuthProvider } from '@contexts/AuthContext'
import { fireEvent } from '@testing-library/react'


describe("Log In", () => {
  it("El componente se renderiza", () => {
    render(<LogIn/>)
  expect(screen.getByText(/Iniciar Sesión/i)).toBeInTheDocument
  })
})