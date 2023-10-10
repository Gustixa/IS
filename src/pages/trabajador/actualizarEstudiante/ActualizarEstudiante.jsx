import React, { useEffect, useState } from 'react'
import { Grid, Box, TextField, Button } from '@mui/material'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '@db-supabase/supabase.config'
import {textFieldStyles, hoverButtons, hoverCancelButton} from './muiStyles'
import styles from './ActualizarEstudiante.module.css'

export default function ActualizarEstudiante () {
  // obteniendo el id del estudiante a actualizar
  const { id } = useParams()
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [carreraEstudiante, setCarreraEstudiante] = useState("")
  const [cantidadBeca, setCantidadBeca] = useState("")
  const [facultadCarrera, setfacultadCarrera] = useState("")
  const [email, setEmail] = useState("")
  const [depto, setDepto] = useState("")
  const [carnetEstudiante, setcarnetEstudiante] = useState("")
  const [horasEstudiante, setHorasEstudiante] = useState("")
  const [anioIngreso, setAnio] = useState("")


  const [nameErrorMessage, setNameErrorMessage] = useState("")
  const [carreraErrorMessage, setCarreraErrorMessage] = useState("")
  const [cantidadBecaErrorMessage, setCantidadBecaErrorMessage] = useState("")
  const [facultadCarreraErrorMessage, setfacultadCarreraErrorMessage] = useState("")
  const [emailErrorMessage, setEmailErrorMessage] = useState("")
  const [deptoErrorMessage, setDeptoErrorMessage] = useState("")
  const [carnetEstudianteErrorMessage, setcarnetEstudianteErrorMessage] = useState("")
  const [horasEstudianteErrorMessage, setHorasEstudianteErrorMessage] = useState("")
  const [anioIngresoErrorMessage, setAnioIngresoErrorMessage] = useState("")

  const [nameValidation, setNameValidation] = useState(false)
  const [carreraValidation, setCarreraValidation] = useState(false)
  const [cantidadBecaValidation, setCantidadBecaValidation] = useState(false)
  const [facultadCarreraValidation, setfacultadCarreraValidation] = useState(false)
  const [emailValidation, setEmailValidation] = useState(false)
  const [deptoValidation, setDeptoValidation] = useState(false)
  const [carnetEstudianteValidation, setcarnetEstudianteValidation] = useState(false)
  const [horasEstudianteValidation, setHorasEstudianteValidation] = useState(false)
  const [anioIngresoValidation, setAnioIngresoValidation] = useState(false)

  useEffect(() => {
    const fetchEstudentDetails = async () => {
      const {data, error} = await supabase
        .from("becado")
        .select()
        .eq("id",id)
        .single()

        if(error){
          navigate("/becarios", {replace:true})
        }
    
        if(data){
          setName(data.nombre_estudiante)
          setcarnetEstudiante(data.carnet)
          setCarreraEstudiante(data.carrera)
          setfacultadCarrera(data.facultad)
          setAnio(data.anio)
          setCantidadBeca(data.porcentaje_beca)
          setEmail(data.correo)
          setHorasEstudiante(data.horas_realizar)
          setDepto(data.departamento)
    
        }
    }
    fetchEstudentDetails()
  }, [id,navigate])

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
      // validacion anio ingresio
      if(!anioIngresio){
        setAnioIngresoValidation(true)
        setAnioIngresoErrorMessage("Debe ingresar un valor para el año de ingreso.")
        isValid = false
      }else{
        setAnioIngresoValidation(false)
        setAnioIngresoErrorMessage("")
      }
      return isValid
    }

    const handleActualizarEstudiante = async (e) => {
      e.preventDefault()
      try{
        if(!validacionCampos){
          return
        }else{
          const {data, error} = await supabase
          .from("becado")
          .update(
            {
              nombre_estudiante: name,
              carnet: carnetEstudiante,
              carrera: carreraEstudiante,
              facultad: facultadCarrera,
              anio: anioIngreso,
              porcentaje_beca: cantidadBeca,
              horas_realizar: horasEstudiante,
              correo: email,
              departamento: depto
            })
          .eq("id",id)
          .select()
        }
      } catch(error){
        console.log("Algo salio mal")
      }
      navigate("/becarios")
    }

    /**
     * Metodo para navegar a la pantalla general de los estudiantes que poseen
     * beca desde la persepectiva de los administradores
     */
    const handleCancelarProceso = () => {
      navigate("/becarios")
    }
  return (
    <>
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
              value={carreraEstudiante}
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
          <Grid item xs={6}>
            <TextField
              label="Año ingreso"
              variant="outlined"
              fullWidth
              style={textFieldStyles}
              value={anioIngreso}
              onChange={(e) => setAnio(e.target.value)}
              error={anioIngresoValidation}
              helperText={anioIngresoErrorMessage}
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
          onClick={(e) => handleActualizarEstudiante(e)}
        >
          Actualizar información
        </Button>
        <Button
        size="medium"
        sx={{...hoverCancelButton, 
          fontSize: '13px', // Aumenta el tamaño del texto dentro del botón
          padding: '12px 24px',
          width: '260px',
          marginLeft: '20px'
        }}
        type="submit"
        variant="outlined"
        onClick={(e) => handleCancelarProceso(e)}
        >
          Cancelar
        </Button>
      </Box>
      
    </div>
    </>
  )
}