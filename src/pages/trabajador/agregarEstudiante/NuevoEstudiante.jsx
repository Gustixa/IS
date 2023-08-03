import React, { useState } from 'react'
import { Grid, Box, TextField } from '@mui/material'
import SideBar from '@components/sideBar'
import styles from './NuevoEstudiante.module.css'
import {textFieldStyles} from './styles'

export default function NuevoEstudiante() {
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

  const handleNameChange = (event) => {
    setName(event.target.value)
    setNameValidation(false)
    setNameErrorMessage('')
  }

  const handleCarreraChange = (event) => {
    setCarrera(event.target.value)
    setCarreraValidation(false)
    setCarreraErrorMessage('')
  }

  const handleCantidadBecaChange = (event) => {
    setCantidadBeca(event.target.value)
    setCantidadBecaValidation(false)
    setCantidadBecaErrorMessage('')
  }

  const handleCantidadCreditoFinancieroChange = (event) => {
    setCantidadCreditoFinanciero(event.target.value)
    setCantidadCreditoFinancieroValidation(false)
    setCantidadCreditoFinancieroErrorMessage('')
  }

  const handleCurrentYearChange = (event) => {
    setCurrentYear(event.target.value)
    setCurrentYearValidation(false)
    setCurrentYearErrorMessage('')
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
              value={name}
              onChange={handleNameChange}
              error={nameValidation}
              helperText={nameErrorMessage}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Carrera"
              variant="outlined"
              fullWidth
              style={textFieldStyles}
              value={carrera}
              onChange={handleCarreraChange}
              error={carreraValidation}
              helperText={carreraErrorMessage}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Cantidad de beca"
              variant="outlined"
              fullWidth
              style={textFieldStyles}
              value={cantidadBeca}
              onChange={handleCantidadBecaChange}
              error={cantidadBecaValidation}
              helperText={cantidadBecaErrorMessage}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Cantidad de credito financiero"
              variant="outlined"
              fullWidth
              style={textFieldStyles}
              value={cantidadCreditoFinanciero}
              onChange={handleCantidadCreditoFinancieroChange}
              error={cantidadCreditoFinancieroValidation}
              helperText={cantidadCreditoFinancieroErrorMessage}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Año en Curso"
              variant="outlined"
              fullWidth
              style={textFieldStyles}
              value={currentYear}
              onChange={handleCurrentYearChange}
              error={currentYearValidation}
              helperText={currentYearErrorMessage}
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
