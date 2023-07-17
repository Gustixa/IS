import React from 'react'
import SideBar from '@components/sideBar'
import Title from '@components/titles'
import encabezados from './encabezados'

export default function HistorialBeca(){
  return (
    <>
      <SideBar/>
      <div>
        <Title
          titles={encabezados}
        ></Title>
      </div>
    </>
  )
}