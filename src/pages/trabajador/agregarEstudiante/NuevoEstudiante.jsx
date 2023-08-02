import React from 'react'
import { Grid, Box, TextField } from '@mui/material'
import SideBar from '@components/sideBar'
import styles from './NuevoEstudiante.module.css'
import {textFieldStyles} from './styles'

export default function NuevoEstudiante(){
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