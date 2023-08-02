import React, { useState } from 'react'
import { Grid, Box, TextField } from '@mui/material'
import SideBar from '@components/sideBar'
import styles from './NuevoEstudiante.module.css'
import {textFieldStyles} from './styles'

export default function NuevoEstudiante(){
  const [name, setName] = useState("")
  const [carrera, setCarrera] = useState("")
  const [cantidadBeca, setCantidadBeca] = useState("")
  const [cantidadCreditoFinanciero, setCantidadCreditoFinanciero] = useState("")
  const [currentYear, setCurrentYear] = useState("")


  const [nameErrorMessage, setNameErrorMessage] = useState("")
  const [carreraErrorMessage, setCarreraErrorMessage] = useState("")
  const [cantidadBecaErrorMessage, setCantidadBecaErrorMessage] = useState("")
  const [cantidadCreditoFinancieroErrorMessage, setCantidadCreditoFinancieroErrorMessage] = useState("")
  const [currentYearErrorMessage, setCurrentYearErrrorMessage] = useState("")

  const [nameValidation, setNameValidation] = useState(false)
  const [carreraValidation, setCarreraValidation] = useState(false)
  const [cantidadBecaValidation, setCantidadBecaValidation] = useState(false)
  const [cantidadCreditoFinancieroValidation, setCantidadCreditoFinancieroValidation] = useState(false)
  const [currentYearValidation, setCurrentYearValidation] = useState(false)
  
  if(name === ""){
    setNameErrorMessage("Debe ingresar el nombre del estudiante")
    setNameValidation(true)
  }
  if(carrera === ""){
    setCarreraErrorMessage("Debe ingresar la carrera del estudiante")
    setCarreraValidation(true)
  }
  if(cantidadBeca === ""){
    setCantidadBecaErrorMessage("Debe ingresar la cantidad de beca del estudiantem, aun si es 0")
    setCantidadBecaValidation(true)
  }
  if(cantidadCreditoFinanciero === ""){
    setCantidadCreditoFinancieroErrorMessage("Debe ingresar una cantidad de credito financiero del estudiante, aun si es 0")
    setCantidadCreditoFinancieroValidation(true)
  }
  if(currentYear === "") {
    setCurrentYearErrrorMessage("Debe ingresar el año de ingreso del estudiante")
    setCurrentYearValidation(true)
  }

  return (
    <>
    <SideBar/>
    <div className={styles.title}>
      <h1>Apartado para agregar un nuevo estudiante</h1>
    </div>
    <div className={styles.container}>
      <Box px={8} pb={8}> {/* Agregamos el espaciado horizontal al contenedor  pb=horizontal, px=vertical*/}
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Nombre del Estudiante"
              variant="outlined"
              fullWidth
              style={textFieldStyles}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Carrera"
              variant="outlined"
              fullWidth
              style={textFieldStyles}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Cantidad de beca"
              variant="outlined"
              fullWidth
              style={textFieldStyles}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Cantidad de credito financiero"
              variant="outlined"
              fullWidth
              style={textFieldStyles}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Año en Curso"
              variant="outlined"
              fullWidth
              style={textFieldStyles}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Ayuda financiera"
              variant="outlined"
              fullWidth
              style={textFieldStyles}
            />
          </Grid>
        </Grid>
      </Box>
    </div>
    </>
  )
}