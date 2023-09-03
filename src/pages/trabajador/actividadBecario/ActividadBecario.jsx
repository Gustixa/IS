/**
 * Esta pagina funciona para ingresar la participacion de los estudiantes
 * en ciertas actividades de beca, de manera manual. Es decir, ingresar el nombre
 * del estudiante, la actividad a la que participo y las horas que se le acreditaran.
 */
import React, {useState} from 'react'
import { Grid, Box, TextField, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@db-supabase/supabase.config'
import SideBar from '@components/sideBar'

export default function ActividadBecario(){
  const [nombreActividad, setNombreActividad] = useState("")
  const [horasAcreditar, sethorasAcreditar] = useState("")
  const [correoEstudiante, setCorreoEstudiante] = useState("")

  const [nombreActividadValidation, setNombreActividadValidation] = useState(false)
  const [horasAcreditarValidation, setHorasAcreditarValidation] = useState(false)
  const [correoEstudianteValidation, setCorreoEstudianteValidation] = useState(false)

  const [nombreActividadErrorMessage, setNombreActividadErrorMessage] = useState("")
  const [horasAcreditarErrorMessage, setHorasAcreditarErrorMessage] = useState("")
  const [correoEstudianteErrorMessage, setCorreoEstudianteErrorMessage] = useState("")

  const navigate = useNavigate()

  /**
   * Validacion de los campos, que no esten vacios
   */
  const validacionCambpos = () => {
    let isValid = true

    // Nombre de la actividad
    if(!nombreActividad){
      setNombreActividadValidation(true)
      setNombreActividadErrorMessage("Debe ingresar el nombre de la actividad")
      isValid = false
    }else{
      setNombreActividadValidation(false)
      setNombreActividadErrorMessage("")
    }
    // cantidad de horas beca
    if(!horasAcreditar){
      setHorasAcreditarValidation(true)
      setHorasAcreditarErrorMessage("Debe ingresar las horas que se acreditan para la actividad")
      isValid = false
    }else{
      setHorasAcreditarValidation(false)
      setHorasAcreditarErrorMessage("")
    }
    // Correo del estudiante
    if(!correoEstudiante){
      setCorreoEstudianteValidation(true)
      setCorreoEstudianteErrorMessage("Debe ingresar el correo del estudiante para poder acreditarle las horas")
    }else{
      setCorreoEstudianteValidation(false)
      setCorreoEstudianteErrorMessage("")
    }
  }

  const handleValidarActividad = (e) => {
    e.preventDefault()
  }
  return (
    <>
      <SideBar/>
    </>
  )
}