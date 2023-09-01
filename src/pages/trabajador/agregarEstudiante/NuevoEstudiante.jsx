import React, { useState, useEffect } from 'react'
import { Grid, Box, TextField, Button } from '@mui/material'
import SideBar from '@components/sideBar'
import styles from './NuevoEstudiante.module.css'
import {textFieldStyles, hoverButtons} from './styles'
import { supabase } from '@db-supabase/supabase.config'

export default function NuevoEstudiante() {
  const [name, setName] = useState("")
  const [carrera, setCarrera] = useState("")
  const [cantidadBeca, setCantidadBeca] = useState("")
  const [facultadCarrera, setfacultadCarrera] = useState("")
  const [email, setEmail] = useState("")
  const [depto, setDepto] = useState("")
  const [carnetEstudiante, setcarnetEstudiante] = useState("")
  const [horasEstudiante, setHorasEstudiante] = useState("")


  const [nameErrorMessage, setNameErrorMessage] = useState("")
  const [carreraErrorMessage, setCarreraErrorMessage] = useState("")
  const [cantidadBecaErrorMessage, setCantidadBecaErrorMessage] = useState("")
  const [facultadCarreraErrorMessage, setfacultadCarreraErrorMessage] = useState("")
  const [emailErrorMessage, setEmailErrorMessage] = useState("")
  const [deptoErrorMessage, setDeptoErrorMessage] = useState("")
  const [carnetEstudianteErrorMessage, setcarnetEstudianteErrorMessage] = useState("")
  const [horasEstudianteErrorMessage, setHorasEstudianteErrorMessage] = useState("")

  const [nameValidation, setNameValidation] = useState(false)
  const [carreraValidation, setCarreraValidation] = useState(false)
  const [cantidadBecaValidation, setCantidadBecaValidation] = useState(false)
  const [facultadCarreraValidation, setfacultadCarreraValidation] = useState(false)
  const [emailValidation, setEmailValidation] = useState(false)
  const [deptoValidation, setDeptoValidation] = useState(false)
  const [carnetEstudianteValidation, setcarnetEstudianteValidation] = useState(false)
  const [horasEstudianteValidation, setHorasEstudianteValidation] = useState(false)

  /**
   * Verificacion de los campos, que son datos requeridos para almacenar en la db
   */
  const validacionCampos = () => {
    let isValid = true;
    // nombre estudiante
    if(!name){
      setNameValidation(true)
      setNameErrorMessage('Debe ingresar el nombre del estudiante')
      isValid = false
    }else{
      setNameValidation(false)
      setNameErrorMessage('')
    }
    // carrera estudiante
    if(!carrera){
      setCarreraValidation(true)
      setCarreraErrorMessage("Debe ingresar la carrera del estudiante")
      isValid = false
    }else{
      setCarreraValidation(false)
      setCarreraErrorMessage("")
    }
    // cantidad beca estudiante
    if(!cantidadBeca){
      setCantidadBecaValidation(true)
      setCantidadBecaErrorMessage("Debe ingresar la cantidad de beca que posee el estudiante, aun si es 0")
    }else{
      setCantidadBecaValidation(false)
      setCantidadBecaErrorMessage("")
    }
    // Horas que el estudiante debe realizar por ciclo
    if(!horasEstudiante){
      setHorasEstudianteValidation(true)
      setHorasEstudianteErrorMessage("Debe ingresar la cantidad de horas que debe realizar el estudiante")
      isValid = false
    }else{
      setHorasEstudianteValidation(false)
      setHorasEstudianteErrorMessage("")
    }
    // facultad a la que pertenece la carrera
    if(!facultadCarrera){
      setfacultadCarreraValidation(true)
      setfacultadCarreraErrorMessage("Debe ingresar la facultad a la que pertenece el estudiante")
      isValid = false
    }else{
      setfacultadCarreraValidation(false)
      setfacultadCarreraErrorMessage("")
    }
    // correo de estudiante
    if(!email){
      setEmailValidation(true)
      setEmailErrorMessage("Debe ingresar el correo del estudiante.")
      isValid = false
    }else{
      setEmailValidation(false)
      setEmailErrorMessage("")
    }
    // contrasenia para ingresar al sistema y ver su registro de hroas beca
    if(!depto){
      setDeptoValidation(true)
      setDeptoErrorMessage("Debe ingresar la contraseña para el estudiante, esto para que use el sistema")
      isValid = false
    }else{
      setDeptoValidation(false)
      setDeptoErrorMessage("")
    }
    // carnet del estudiante
    if(!carnetEstudiante){
      setcarnetEstudianteValidation(true)
      setcarnetEstudianteErrorMessage("Debe ingresar el carnet del estudiante.")
      isValid = false      
    }else{
      setcarnetEstudianteValidation(false)
      setcarnetEstudianteErrorMessage("")
    }
    // validacion de las horas a realizar
    if(!horasEstudiante){
      setHorasEstudianteValidation(true)
      setHorasEstudianteErrorMessage("Debe ingresar un valor para las horas que debe realizar el estudiante")
      isValid = false
    }else{
      setHorasEstudianteValidation(false)
      setHorasEstudianteErrorMessage("")
    }
    return isValid
  }

  // Obtener el año actual del sistema
  const obtenerAnioActual = () => new Date().getFullYear()

  // Llamar a la función para obtener el año actual
  const anioActual = obtenerAnioActual()
  
  const handleAgregarEstudiante = async (e) => {
    e.preventDefault()
    
    try{
      // Validar que esten llenos los campos requeridos
      if(!validacionCampos()){
        return      
      }else{
        // Realizar la inserción en la tabla "becado" con los datos del estudiante
        const { data, error} = await supabase
        .from('becado')
        .insert([
          {
            porcentaje_beca:cantidadBeca,
            horas_realizar: horasEstudiante,
            carrera: carrera,        
            facultad: facultadCarrera,
            anio: anioActual,
            horas_acumuladas:"0",
            nombre_estudiante:name,
            carnet: carnetEstudiante,
            correo: email,
            departamento:depto
          }
        ])
      }
      
    }catch(error){
      console.error('Error al agregar estudiante:', error.message)
    }

    try{
      // Insertar al estudiante en la tabla "usuario"
      const { dataUser, errorUser } = await supabase
        .from('usuario')
        .insert([
          {
            correo:email,
            password: carnetEstudiante,
            admin: false,
          }
        ])
  
      if(dataUser){
        console.log(data)
      }
    }catch(error){
      console.log("Error: ", error.message)
    }
    setName("")
    setCarrera("")
    setCantidadBeca("")
    setHorasEstudiante("")
    setfacultadCarrera("")
    setEmail("")
    setDepto("")
    setcarnetEstudiante("")
    
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
              onChange={(e) => setName(e.target.value)}
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
              onChange={(e) => setCarrera(e.target.value)}
              error={carreraValidation}
              helperText={carreraErrorMessage}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Departamento"
              variant="outlined"
              fullWidth
              style={textFieldStyles}
              value={depto}
              onChange={(e) => setDepto(e.target.value)}
              error={deptoValidation}
              helperText={deptoErrorMessage}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Facultad"
              variant="outlined"
              fullWidth
              style={textFieldStyles}
              value={facultadCarrera}
              onChange={(e) => setfacultadCarrera(e.target.value)}
              error={facultadCarreraValidation}
              helperText={facultadCarreraErrorMessage}
            />
          </Grid>          
          <Grid item xs={6}>
            <TextField
              label="Cantidad de beca"
              variant="outlined"
              fullWidth
              style={textFieldStyles}
              value={cantidadBeca}
              onChange={(e) => setCantidadBeca(e.target.value)}
              error={cantidadBecaValidation}
              helperText={cantidadBecaErrorMessage}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Cantidad Horas a Realizar por el Estudiante"
              variant="outlined"
              fullWidth
              style={textFieldStyles}
              value={horasEstudiante}
              onChange={(e) => setHorasEstudiante(e.target.value)}
              error={horasEstudianteValidation}
              helperText={horasEstudianteErrorMessage}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Correo"
              variant="outlined"
              fullWidth
              style={textFieldStyles}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={emailValidation}
              helperText={emailErrorMessage}
            />
          </Grid>          
          <Grid item xs={6}>
            <TextField
              label="Carnet"
              variant="outlined"
              fullWidth
              style={textFieldStyles}
              value={carnetEstudiante}
              onChange={(e) => setcarnetEstudiante(e.target.value)}
              error={carnetEstudianteValidation}
              helperText={carnetEstudianteErrorMessage}
            />
          </Grid>
        </Grid>
      </Box>
      <Box display="flex" justifyContent="flex-end" paddingRight={8}>
        <Button 
          size="medium"
          sx={{...hoverButtons, 
            fontSize: '13px', // Aumenta el tamaño del texto dentro del botón
            padding: '12px 24px',
            width: '260px'}}
          type="submit"
          variant="outlined"
          onClick={(e) => handleAgregarEstudiante(e)}
        >
          Agregar estudiante
        </Button>
      </Box>
      
    </div>
    </>
  )
}
