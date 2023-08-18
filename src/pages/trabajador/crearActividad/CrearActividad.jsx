import React, { useState, useEffect } from 'react'
import { Grid, Box, TextField, Button } from '@mui/material'
import styles from './CrearActividad.module.css'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@db-supabase/supabase.config'
import {textFieldStyles, hoverButtons, hoverCancelButton} from './muiStyles'


export default function CrearActividad(){
  const[nombreActividad, setNombreActividad] = useState("")
  const[descripcion, setDescripcion] = useState("")
  const[cantidadVoluntarios, setCantidadVoluntarios] = useState("")
  const[horasAcreditar, setHorasAcreditar] = useState("")

  const[nombreActividadValidation, setNombreActividadValidation] = useState(false)
  const[descripcionValidation, setDescripcionValidation] = useState(false)
  const[cantidadVoluntariosValidation, setCantidadVoluntariosValidations] = useState(false)
  const[horasAcreditarValidation, setHorasAcreditarValidation] = useState(false)

  const[nombreActividadErrorMessage, setNombreActividadErrorMessage] = useState("")
  const[descripcionErrorMessage, setDescripcionErrorMessage] = useState("")
  const[cantidadVoluntariosErrorMessage, setCantidadVoluntariosErrorMessage] = useState("")
  const[horasAcreditarErrorMessage, setHorasAcreditarErrorMessage] = useState("")

  const navigate = useNavigate()
  /**
   * Validacion de los campos, en esta caso, se espera que se ingresen datos en los campos
   */
  const validacionCampos = () => {
    let isValid = true
    // Nombre actividad
    if(!nombreActividad){
      setNombreActividadValidation(true)
      setNombreActividadErrorMessage('Debe ingresar el nombre de la actividad')
      isValid = false
    }else{
      setNombreActividadValidation(false)
      setNombreActividadErrorMessage('')
    }
    // Cantidad voluntarios
    if(!cantidadVoluntarios){
      setCantidadVoluntariosValidations(true)
      setCantidadVoluntariosErrorMessage("Debe ingresar la cantidad de voluntarios para la actividad")
    }else{
      setCantidadVoluntariosValidations(false)
      setCantidadVoluntariosErrorMessage("")
    }
    // Descripcion de la actividad
    if(!descripcion){
      setDescripcionValidation(true)
      setDescripcionErrorMessage("Debe ingresar la descripcion de la actividad")
    }else{
      setDescripcionValidation(false)
      setDescripcionErrorMessage("")
    }
    // Horas a acreditar para la actividad
    if(!horasAcreditar){
      setHorasAcreditarValidation(true)
      setHorasAcreditarErrorMessage("Debe ingresar las horas que acreditara")
    }else{
      setHorasAcreditarValidation(false)
      setHorasAcreditarErrorMessage("")
    }
    return isValid
  }
  
  const handleCreacionActividad = async (e) => {
    e.preventDefault()
    try{
      //validar que los campos no esten vacios
      if(!validacionCampos()){
        return
      }else{
        const{data, error} = await supabase
        .from("actividad_beca")
        .insert([
          {
           nombre_actividad: nombreActividad,
           cupos_disponibles: cantidadVoluntarios,
           horas_acreditadas: horasAcreditar,
           descripcion: descripcion
          }
        ])
      }

    }catch(error){
      console.log("Error al crear la actividad: ", error.message)
    }
    navigate("/nuevaActividadBeca")
  }

  const handleCancelarProceso = () => {
    navigate("/nuevaActividadBeca")
  }
  return (
    <>
      <div className={styles.title}>
        <h1>DETALLES PARA LA ACTIVIDAD DE HORAS BECA</h1>
      </div>
      <div className={styles.container}>
        <Box px={8} pb={8}> {/* Agregamos el espaciado horizontal al contenedor  pb=horizontal, px=vertical*/}
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Nombre actividad"
                variant="outlined"
                fullWidth
                style={textFieldStyles}
                value={nombreActividad}
                onChange={(e) => setNombreActividad(e.target.value)}
                error={nombreActividadValidation}
                helperText={nombreActividadErrorMessage}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Cantidad voluntarios"
                variant="outlined"
                fullWidth
                type="number"
                style={textFieldStyles}
                onChange={(e) => setCantidadVoluntarios(e.target.value)}
                inputProps={{min: '0'}}
                InputLabelProps={{
                  shrink: true
                }}
                error={cantidadVoluntariosValidation}
                helperText={cantidadVoluntariosErrorMessage}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Cantidad voluntarios"
                variant="outlined"
                fullWidth
                type="number"
                style={textFieldStyles}
                onChange={(e) => setHorasAcreditar(e.target.value)}
                inputProps={{min: '0'}}
                InputLabelProps={{
                  shrink: true
                }}
                error={horasAcreditarValidation}
                helperText={horasAcreditarErrorMessage}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Descripcion"
                variant="outlined"
                fullWidth
                style={textFieldStyles}
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                error={descripcionValidation}
                helperText={descripcionErrorMessage}
                multiline
                maxRows={9}
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
            onClick={(e) => handleCreacionActividad(e)}
          >
            Agregar
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