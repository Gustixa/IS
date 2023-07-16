import React from 'react'
import { useLocation  } from 'react-router-dom'
import SideBar from '@components/sideBar'

export default function Home(){
  // Recibiendo como parametro, el tipo de usuario
  const location = useLocation()
  const { tipo, usuario } = location.state
  return (
    <div> 
      <SideBar
        tipoUsuario= {tipo}
      />
    </div>
  )
}