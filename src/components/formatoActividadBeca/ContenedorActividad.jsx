import React from 'react'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { Link } from 'react-router-dom'
import { supabase } from '@db-supabase/supabase.config'
import styles from './ContenedorActividad.module.css'

export default function ContenedorActividad({ actividad, onDelete }) {

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

    }

  }
  return (
    <div className={styles.container}>
      
      <h1>{actividad.nombre_actividad}</h1>
      <p className={styles.scrollableText}>
        {actividad.descripcion}
       </p>
      <p>{actividad.cupos_disponibles}</p>
      <p>{actividad.horas_acreditadas}</p>
      <div className={styles.buttons}>
        <Link to={'/actualizarActividad/'+actividad.id}>
          <IconButton 
            color="primary"
            size="large"
            >      
            <EditIcon/>
          </IconButton>
        </Link>
        <IconButton 
          color="secondary"
          size="large"
          onClick={(e) => handleDelete(e)}
          >
          <DeleteIcon/>
        </IconButton>
      </div>
    </div>
  )
}