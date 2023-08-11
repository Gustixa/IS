/* Este archivo tiene la funcionalidad de poder extrar toda la informacion de la
base de datos de la nube, para luego presentar la informacion de una manera]
mas amena a la vista */
import React, { useState, useEffect } from 'react'
import SideBar from '@components/sideBar'
import ContenedorActividad from '@components/formatoActividadBeca'
import Title from '@components/titles'
import encabezado from './encabezado'
import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@db-supabase/supabase.config'
import buttonStyle from './styleButton'
import styles from './ActividadBeca.module.css'

export default function ActividadBeca(){
  const[fetchError, setFetchError] = useState(null)
  const[actividad, setActividad] = useState(null)

  const navigate = useNavigate()

  // Poder redireccionar para tener los detalles de la actividad
  const handleCreateActivity = () => {
    navigate("/detallesActividad")
  }
  useEffect(() => {
    const fetchActividad = async () => {
      const { data, error } = await supabase
      .from("actividad_beca")
      .select("*")

      if(error){
        setFetchError("No se pudo obtener la informacion de la base de datos.")
        setActividad(null)
        console.log(error)
      }
      if(data){
        setActividad(data)
        setFetchError(null)
      }
    }
    fetchActividad()
  }, [])
  return (
    <>
      <SideBar/>
      <Title titles={encabezado}></Title>
      <Button>
        Crear Actividad
      </Button>
      <div className={styles.display}>
        <ContenedorActividad/>
        <ContenedorActividad/>
        <ContenedorActividad/>
        <ContenedorActividad/>
        <ContenedorActividad/>
        <ContenedorActividad/>
        <ContenedorActividad/>
        <ContenedorActividad/>
        <ContenedorActividad/>
        <ContenedorActividad/>
        <IconButton 
          size="large"
          style={buttonStyle} color="primary"
          onClick={() => handleCreateActivity()}
          >
          <AddIcon style={{ fontSize: 'inherit' }}/>
        </IconButton>
      </div>  
      <div className={styles.finalBlock}>
      </div>    
    </>
  )
}