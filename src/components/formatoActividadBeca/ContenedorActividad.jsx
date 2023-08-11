import React from 'react'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { useNavigate } from 'react-router-dom'
import styles from './ContenedorActividad.module.css'

export default function ContenedorActividad() {
  const navigate = useNavigate()

  const handleEdit = (e) => {
    navigate("/detallesActividad")
  }
  return (
    <div className={styles.container}>
      
      <h1>titulo</h1>
      <p className={styles.scrollableText}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat 
        nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
        deserunt mollit anim id est laborum.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat 
        nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
        deserunt mollit anim id est laborum.
       </p>
      <p>participantes</p>
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