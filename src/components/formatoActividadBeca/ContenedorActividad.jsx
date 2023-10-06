/**
 * Formato base para mostrar las actividades de horas beca que
 * pueden realizar los estudiantes. En si, es para presentar las actividades
 * creadas y a las que se pueden inscribir.
 */
import React, { useState } from 'react'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'

import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Paper from '@mui/material/Paper'

import { supabase } from '@db-supabase/supabase.config'
import { useAuthContext } from '@contexts/AuthContext'
import styles from './ContenedorActividad.module.css'
import {hoverButtons} from './muiStyles'

function PaperComponent(props){
  return (
    <Paper {...props} />  
  )
}

export default function ContenedorActividad({ actividad, onDelete, inscrito, onSuscribe }) {
  const [open, setOpen] = useState(false)
  const [isInscrito, setIsInscrito] = useState(inscrito) // Estado para controlar si el usuario está inscrito

  const { 
    authUser,
    setAuthUser,
    isLoggedIn,
    setIsLoggedIn} = useAuthContext()

  // Abrir la ventana de detalles de la actividad
  const handleClickOpen = () => {
    setOpen(true)
  }

  // Cerrar la ventana de detalles de la actividad
  const handleClose = () => {
    setOpen(false)
  }

  /**
   * Eliminar una actividad. Esto solo es para los administradores.
   * En este caso, sirve para poder quitar de la pantalla, sin tener 
   * que refrescar para poder ver el resultado de la eliminación.
   * @param {} e 
   */
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
      console.log("Fallo en la eliminiacion de actividades: ", error.message)
    }
  }
  
  /**
   * Inscribirse a una actividad de horas beca. Esto es por parte de los estudiantes
   * @param {*} e 
   */
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
      // Llama a la función onSuscribe pasando la actividad para ocultarla
      onSuscribe(actividad.id)
      // Cambia el estado para indicar que el usuario está inscrito
      setIsInscrito(true)
      

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
        <div className={styles.buttonsStudent}>
         {authUser.type === false && !inscrito && (
          
            <Button
              variant="contained"
              color="primary"
              sx={{...hoverButtons}}
              onClick={(e) => handleInscripcion(e)}
            >
              Inscribirse
            </Button>
          
        )}
        {authUser.type === false && (
          <>
            <Button
            variant="contained"
            color="primary"
              sx={{...hoverButtons,marginLeft:'10px'}}
            onClick={handleClickOpen}
            >
              Detalles
            </Button>
            <Dialog
              open={open}
              onClose={handleClose}
              PaperComponent={PaperComponent}
              aria-labelledby="draggable-dialog-title"
             >
              <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                {actividad.nombre_actividad}
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                <div>
                      <p className={styles.scrollableText}>
                        <strong>Descripción:</strong>
                        {actividad.descripcion}
                      </p>
                      <p>
                        <strong>Cupos Disponibles:</strong> {actividad.cupos_disponibles}
                      </p>
                      <p>
                        <strong>Horas Acreditadas:</strong> {actividad.horas_acreditadas}
                      </p>
                    </div>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button autoFocus onClick={handleClose}>
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
          </>
        )}
        </div>
      </div>
    </div>
  )
}