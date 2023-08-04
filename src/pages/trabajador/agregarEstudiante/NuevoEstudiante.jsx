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
  const [cantidadCreditoFinanciero, setCantidadCreditoFinanciero] = useState("")
  const [facultadCarrera, setfacultadCarrera] = useState("")
  const [email, setEmail] = useState("")
  const [contrasenia, setContrasenia] = useState("")
  const [carnetEstudiante, setcarnetEstudiante] = useState("")


  const [nameErrorMessage, setNameErrorMessage] = useState("")
  const [carreraErrorMessage, setCarreraErrorMessage] = useState("")
  const [cantidadBecaErrorMessage, setCantidadBecaErrorMessage] = useState("")
  const [cantidadCreditoFinancieroErrorMessage, setCantidadCreditoFinancieroErrorMessage] = useState("")
  const [facultadCarreraErrorMessage, setfacultadCarreraErrorMessage] = useState("")
  const [emailErrorMessage, setEmailErrorMessage] = useState("")
  const [contraseniaErrorMessage, setContraseniaErrorMessage] = useState("")
  const [carnetEstudianteErrorMessage, setcarnetEstudianteErrorMessage] = useState("")

  const [nameValidation, setNameValidation] = useState(false)
  const [carreraValidation, setCarreraValidation] = useState(false)
  const [cantidadBecaValidation, setCantidadBecaValidation] = useState(false)
  const [cantidadCreditoFinancieroValidation, setCantidadCreditoFinancieroValidation] = useState(false)
  const [facultadCarreraValidation, setfacultadCarreraValidation] = useState(false)
  const [emailValidation, setEmailValidation] = useState(false)
  const [contraseniaValidation, setContraseniaValidation] = useState(false)
  const [carnetEstudianteValidation, setcarnetEstudianteValidation] = useState(false)

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
    // cantidad credito financiero estudiante
    if(!cantidadCreditoFinanciero){
      setCantidadCreditoFinancieroValidation(true)
      setCantidadCreditoFinancieroErrorMessage("Debe ingresar la cantidad de credito financiero")
      isValid = false
    }else{
      setCantidadCreditoFinancieroValidation(false)
      setCantidadCreditoFinancieroErrorMessage("")
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
    if(!contrasenia){
      setContraseniaValidation(true)
      setContraseniaErrorMessage("Debe ingresar la contraseña para el estudiante, esto para que use el sistema")
      isValid = false
    }else{
      setContraseniaValidation(false)
      setContraseniaErrorMessage("")
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
    console.log('isValid', isValid)
    return isValid
  }


  const handleAgregarEstudiante = async (e) => {
    e.preventDefault()
    
    try{
      console.log('llamada a validacion campos')
      if(!validacionCampos()){
        return
      }else{
        console.log('salida')
        // Realizar la inserción en la tabla "becado" con los datos del estudiante
        const { data, error} = await supabase
        .from('becado')
        .insert([
          {
            cantidad_beca:cantidadBeca,
            cantidad_credito: cantidadCreditoFinanciero,
            carrera: carrera,        
            facultad: facultadCarrera,
            anio: "2023",
            horas_acumuladas:"0",
            nombre_estudiante:name,
            carnet: carnetEstudiante,
            correo: email,
            password:contrasenia
          }
        ])
        console.log(data)
        console.log(error)
        // Insertar al estudiante en la tabla "usuario"
        const { dataUser, errorUser } = await supabase
          .from('usuario')
          .insert([
            {
              email,
              contrasenia,
              admin: false,
            }
          ])
    
        if(data){
          console.log(data)
        }
      }
      
    }catch(error){
      console.error('Error al agregar estudiante:', error.message)
    }
    
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
              label="Cantidad de credito financiero"
              variant="outlined"
              fullWidth
              style={textFieldStyles}
              value={cantidadCreditoFinanciero}
              onChange={(e) => setCantidadCreditoFinanciero(e.target.value)}
              error={cantidadCreditoFinancieroValidation}
              helperText={cantidadCreditoFinancieroErrorMessage}
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
              label="Constraseña"
              variant="outlined"
              fullWidth
              style={textFieldStyles}
              value={contrasenia}
              onChange={(e) => setContrasenia(e.target.value)}
              error={contraseniaValidation}
              helperText={contraseniaErrorMessage}
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
      <Button 
        size="medium"
        sx={hoverButtons}
        type="submit"
        variant="outlined"
        onClick={(e) => handleAgregarEstudiante(e)}
      >
        Agregar
      </Button>
    </div>
    </>
  )
}
