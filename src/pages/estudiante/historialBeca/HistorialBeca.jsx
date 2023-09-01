import React from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

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