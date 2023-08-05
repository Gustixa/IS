import React, { useState,useEffect } from 'react'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Title from '@components/titles'
import SideBar from '@components/sideBar'
import { supabase } from '@db-supabase/supabase.config'
import styles from './Becarios.module.css'
import encabezados from './data'
import { StyledTableCell, StyledTableRow,hoverButtons } from './muiStylesBecario'


export default function Becarios(){
  const[value, setValue] = useState('')
  const[studentsData, setStudentsData] = useState([])
  
  const handleChange = (event) => {
    const inputValue = event.target.value
    if(inputValue >= 0 || inputValue === ''){
      setValue(inputValue)
    }
  }
  // Obtencion de la informacion de la db
  useEffect(() => {
    async function fetchStudentsData(){
      const { data, error } = await supabase
      .from("becado")
      .select("*")

      if(error){
        console.log("Error fetching data: ", error)
      }else{
        setStudentsData(data)
      }
    }
    fetchStudentsData()
  }, [])

  return (
    <div>
     <SideBar/>
      
      <Box
        component="form"
        className={styles.box}
      >
        <TextField
          className={styles.input}
          label="Filtrar por año"
          variant="outlined"
          type="number"
          onChange={handleChange}
          inputProps={{min: '0'}}
          InputLabelProps={{
            shrink: true
          }}
        />
        <TextField
          className={styles.input}
          label="Filtrar por nombre"
          variant="outlined"
        />
        <TextField
          className={styles.input}
          label="Filtrar por carnet"
          variant="outlined"
          type="number"
          onChange={handleChange}
          inputProps={{min: '0'}}
          InputLabelProps={{
            shrink:true
          }}
        />
        <TextField
          className={styles.input}
          label="Filtrar por % beca"
          variant="outlined"
          type="number"
          onChange={handleChange}
          inputProps={{min: '0'}}
          InputLabelProps={{
            shrink: true
          }}
        />
        <TextField
          className={styles.input}
          label="Filtrar por horas beca realizadas"
          variant="outlined"
          type="number"
          onChange={handleChange}
          inputProps={{min: '0'}}
          InputLabelProps={{
            shrink: true
          }}
        />
        <TextField
          className={styles.input}
          label="Filtrar por horas beca faltantes"
          variant="outlined"
          type="number"
          onChange={handleChange}
          inputProps={{min: '0'}}
          InputLabelProps={{
            shrink: true
          }}
        />
      </Box>
      <div className={styles.filterButton}>
        <Button
          variant="contained"
          sx={hoverButtons}
        >
          Filtrar
        </Button>
      </div>
      <div className={styles.data}>
        {/*  Aqui debe ir la data de los estudiantes para mostrarse */}
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                {encabezados.map((encabezado) => (
                  <StyledTableCell key={encabezado}>{encabezado}</StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {studentsData.map((student) => (
                <StyledTableRow key={student.id}>
                  <StyledTableCell component="th" scope="row">
                    {student.nombre_estudiante}
                  </StyledTableCell>
                  <StyledTableCell align="right">{student.carnet}</StyledTableCell>
                  <StyledTableCell align="right">{student.carrera}</StyledTableCell>
                  <StyledTableCell align="right">{student.anio}</StyledTableCell>
                  <StyledTableCell align="right">{student.porcentaje_beca}</StyledTableCell>
                  <StyledTableCell align="right">{student.porcentaje_credito}</StyledTableCell>
                  <StyledTableCell align="right">{student.horas_acumuladas}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  )
}