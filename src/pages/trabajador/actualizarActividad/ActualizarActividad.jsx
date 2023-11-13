import React, { useEffect, useState } from 'react'
import {
  Grid, Box, TextField, Button,
} from '@mui/material'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '@db-supabase/supabase.config'
import styles from './ActualizarActividad.module.css'
import { textFieldStyles, hoverButtons, hoverCancelButton } from './muiStyles'

export default function ActualizarActividad() {
  // Obteniendo el id de la actividad a actualizar
  const { id } = useParams()
  const navigate = useNavigate()

  const [nombreActividad, setNombreActividad] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [cantidadVoluntarios, setCantidadVoluntarios] = useState('')
  const [horasAcreditar, setHorasAcreditar] = useState('')

  const [nombreActividadValidation, setNombreActividadValidation] = useState(false)
  const [descripcionValidation, setDescripcionValidation] = useState(false)
  const [cantidadVoluntariosValidation, setCantidadVoluntariosValidations] = useState(false)
  const [horasAcreditarValidation, setHorasAcreditarValidation] = useState(false)

  const [nombreActividadErrorMessage, setNombreActividadErrorMessage] = useState('')
  const [descripcionErrorMessage, setDescripcionErrorMessage] = useState('')
  const [cantidadVoluntariosErrorMessage, setCantidadVoluntariosErrorMessage] = useState('')
  const [horasAcreditarErrorMessage, setHorasAcreditarErrorMessage] = useState('')

  useEffect(() => {
    const fetchActivityDetails = async () => {
      const { data, error } = await supabase
        .from('actividad_beca')
        .select()
        .eq('id', id)
        .single()

      if (error) {
        navigate('/actividadesBeca', { replace: true })
      }
      if (data) {
        setNombreActividad(data.nombre_actividad)
        setCantidadVoluntarios(data.cupos_disponibles)
        setHorasAcreditar(data.horas_acreditadas)
        setDescripcion(data.descripcion)
      }
    }
    fetchActivityDetails()
  }, [id, navigate])

  /**
   * Validacion de los campos, en esta caso, se espera que se ingresen datos en los campos
   */
  const validacionCampos = () => {
    let isValid = true
    // Nombre actividad
    if (!nombreActividad) {
      setNombreActividadValidation(true)
      setNombreActividadErrorMessage('Debe ingresar el nombre de la actividad')
      isValid = false
    } else {
      setNombreActividadValidation(false)
      setNombreActividadErrorMessage('')
    }
    // Cantidad voluntarios
    if (!cantidadVoluntarios) {
      setCantidadVoluntariosValidations(true)
      setCantidadVoluntariosErrorMessage('Debe ingresar la cantidad de voluntarios para la actividad')
    } else {
      setCantidadVoluntariosValidations(false)
      setCantidadVoluntariosErrorMessage('')
    }
    // Descripcion de la actividad
    if (!descripcion) {
      setDescripcionValidation(true)
      setDescripcionErrorMessage('Debe ingresar la descripcion de la actividad')
    } else {
      setDescripcionValidation(false)
      setDescripcionErrorMessage('')
    }
    // Horas a acreditar para la actividad
    if (!horasAcreditar) {
      setHorasAcreditarValidation(true)
      setHorasAcreditarErrorMessage('Debe ingresar las horas que acreditara')
    } else {
      setHorasAcreditarValidation(false)
      setHorasAcreditarErrorMessage('')
    }
    return isValid
  }

  /**
   *
   * @param {*} e
   */
  const handleActualizarActividad = async (e) => {
    e.preventDefault()
    try {
      if (!validacionCampos) {
        return
      }
      const { data, error } = await supabase
        .from('actividad_beca')
        .update(
          {
            nombre_actividad: nombreActividad,
            cupos_disponibles: cantidadVoluntarios,
            horas_acreditadas: horasAcreditar,
            descripcion,
          },
        )
        .eq('id', id)
        .select()
      /*
      if (data) {
        console.log('data: ', data)
      }
      if (error) {
        console.log('NO FUNCIONO')
      }
      */
    } catch (error) {
      console.log('Algo salio mal')
    }

    navigate('/actividadesBeca')
  }

  /**
   * Metodo para navegar a la pantalla general de actividades
   * en caso de no desar realizar cambios
   */
  const handleCancelarProceso = () => {
    navigate('/actividadesBeca')
  }
  return (
    <>
      <div className={styles.title}>
        <h1>ACTULIZAR DETALLES PARA LA ACTIVIDAD DE HORAS BECA</h1>
      </div>
      <div className={styles.container}>
        <Box px={8} pb={8}>
          {' '}
          {/* Agregamos el espaciado horizontal al contenedor  pb=horizontal, px=vertical */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
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
            <Grid item xs={12} sm={3}>
              <TextField
                label="Cantidad voluntarios"
                variant="outlined"
                fullWidth
                type="number"
                style={textFieldStyles}
                value={cantidadVoluntarios}
                onChange={(e) => setCantidadVoluntarios(e.target.value)}
                inputProps={{ min: '0' }}
                InputLabelProps={{
                  shrink: true,
                }}
                error={cantidadVoluntariosValidation}
                helperText={cantidadVoluntariosErrorMessage}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Horas a Acreditar"
                variant="outlined"
                fullWidth
                type="number"
                value={horasAcreditar}
                style={textFieldStyles}
                onChange={(e) => setHorasAcreditar(e.target.value)}
                inputProps={{ min: '0' }}
                InputLabelProps={{
                  shrink: true,
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
        <Box display="flex" justifyContent="center" px={8} sx={{ marginBottom: '20px' }}>
          <Button
            size="medium"
            sx={{
              ...hoverButtons,
              fontSize: '13px', // Aumenta el tamaño del texto dentro del botón
              padding: '12px 24px',
              width: '260px',
              minWidth: '120px',
            }}
            type="submit"
            variant="outlined"
            onClick={(e) => handleActualizarActividad(e)}
          >
            Actualizar
          </Button>
          <Button
            size="medium"
            sx={{
              ...hoverCancelButton,
              fontSize: '13px', // Aumenta el tamaño del texto dentro del botón
              padding: '12px 24px',
              width: '260px',
              marginLeft: '20px',
              minWidth: '120px',
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
