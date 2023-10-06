import React, { useState, useEffect } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { supabase } from '@db-supabase/supabase.config'
import { StyledTableCell, StyledTableRow } from './muiStylesRegistro'
import SideBar from '@components/sideBar'
import Title from '@components/titles'
import {encabezados, encabezado_seccion_principal} from './encabezados'
import styles from './HistorialBeca.module.css'

export default function HistorialBeca(){
  const [dataRegistro, setDataRegistro] = useState([])

  const fetchDataRegistro = async () => {
    try {
      const { data, error } = await supabase.from('validacion_manual_actividad').select('*');

      if (error) {
        console.error('Error fetching data: ', error);
      } else {
        setDataRegistro(data);
      }
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  }

  useEffect(() => {
    fetchDataRegistro();
  }, [])
  
  return (
    <>
      <SideBar/>
      <Title titles={encabezado_seccion_principal} /> {/* Título de la página */}
      <div className={styles.data}>
      <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                {encabezados.map((encabezado) => (
                  <StyledTableCell align="center" key={encabezado}>{encabezado}</StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {dataRegistro.length > 0 ? (
                dataRegistro.map((item) => (
                  <StyledTableRow key={item.id}>
                    
                    <StyledTableCell align="center">{item.nombre_actividad}</StyledTableCell>
                    <StyledTableCell align="center">{item.fecha}</StyledTableCell>
                    <StyledTableCell align="center">{item.horas_acreditar}</StyledTableCell>
                    <StyledTableCell align="center">{item.correo_estudiante}</StyledTableCell>
                  </StyledTableRow>
                ))
              ) : (
                <StyledTableRow>
                  <StyledTableCell colSpan={9} align="center">
                    <CircularProgress />
                  </StyledTableCell>
                </StyledTableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  )
}