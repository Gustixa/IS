import React from 'react'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { useNavigate } from 'react-router-dom'
import styles from './ContenedorActividad.module.css'

export default function ContenedorActividad({nombre_actividad, cupos_disponibles,
horas_acreditadas, descripcion}) {
  const navigate = useNavigate()

  const handleEdit = (e) => {
    navigate("/detallesActividad")
  }
  return (
    <div className={styles.container}>
      
      <h1>{nombre_actividad}</h1>
      <p className={styles.scrollableText}>
        {descripcion}
       </p>
      <p>{cupos_disponibles}</p>
      <p>{horas_acreditadas}</p>
      <div className={styles.buttons}>
        <IconButton 
          color="primary"
          size="large"
          onClick={(e) => handleEdit(e)}
          >
          <EditIcon/>
        </IconButton>
        <IconButton color="secondary" size="large">
          <DeleteIcon/>
        </IconButton>
      </div>
    </div>
  )
}