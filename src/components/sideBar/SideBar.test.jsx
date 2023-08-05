import React from 'react'
import { render, screen } from '@testing-library/react'
import SideBar from './SideBar'

describe("SideBar", () => {
  test("Verificar que se abra el SideBar", () => {
    render(<SideBar />);
    const menuIcon = screen.getByLabelText("menu icon");
    fireEvent.click(menuIcon);

    // Verificar que el SideBar está abierto
    const sideBar = screen.getByRole('presentation');
    expect(sideBar).toBeInTheDocument();
  });

  test("Verificar que se cierre el SideBar", () => {
    render(<SideBar />);
    const menuIcon = screen.getByLabelText("menu icon");
    fireEvent.click(menuIcon);

    // Verificar que el SideBar está abierto
    const sideBar = screen.getByRole('presentation');
    expect(sideBar).toBeInTheDocument();

    fireEvent.click(menuIcon);

    // Verificar que el SideBar está cerrado
    expect(sideBar).not.toBeInTheDocument();
  });
})