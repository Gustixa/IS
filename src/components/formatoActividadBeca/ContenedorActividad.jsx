import React from 'react'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import { supabase } from '@db-supabase/supabase.config'
import { useAuthContext } from '@contexts/AuthContext'
import styles from './ContenedorActividad.module.css'
import {hoverButtons} from './muiStyles'

export default function ContenedorActividad({ actividad, onDelete }) {

  const { 
    authUser,
    setAuthUser,
    isLoggedIn,
    setIsLoggedIn} = useAuthContext()

  const handleDelete = async (e) => {
    try{
      const { data, error } = await supabase
      .from("actividad_beca")
      .delete()
      .eq("id", actividad.id)
      onDelete(actividad.id)
      if(data){
        console.log(data)
      }

    }catch(error){
      console.log("Algo salio mal: ", error)
    }
  }
  console.log(authUser.correo)
  const handleInscripcion = async (e) => {
    try{
      const { dataEstudiante, error } = await supabase
      .from("inscripcion_actividad")
      .insert([
        {
          actividad_id: actividad.id,
          acreditado: false,
          correo_estudiante: authUser.correo
        }
      ])
      .select()

    }catch(error){
      console.log("Error: ", error.message)
    }
  }
  return (
    <div className={styles.container}>
      
      <h1 id='tituloActividad'>{actividad.nombre_actividad}</h1>
      <p className={styles.scrollableText}>
        {actividad.descripcion}
       </p>
      <p>{actividad.cupos_disponibles}</p>
      <p>{actividad.horas_acreditadas}</p>
      <div className={styles.buttons}>
        {/* Conditionally render the buttons based on authUser.type */}
        {authUser.type === true && (
          <>
            <Link to={'/actualizarActividad/' + actividad.id}>
              <IconButton color="primary" size="large">
                <EditIcon />
              </IconButton>
            </Link>
            <IconButton
              color="secondary"
              size="large"
              onClick={(e) => handleDelete(e)}
            >
              <DeleteIcon />
            </IconButton>
          </>
        )}
         {authUser.type === false && (
          <div className={styles.buttonsStudent}>
            <Button
              variant="contained"
              color="primary"
              sx={{...hoverButtons}}
              onClick={(e) => handleInscripcion(e)}
            >
              Inscribirse
            </Button>
            <Button
            variant="contained"
            color="primary"
              sx={{...hoverButtons,marginLeft:'10px'}}
            >
              Detalles
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}