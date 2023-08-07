import React, { useState, useEffect } from 'react'
import SideBar from '@components/sideBar'
import ContenedorActividad from '@components/formatoActividadBeca'
import { supabase } from '@db-supabase/supabase.config'

export default function ActividadBeca(){
  const[fetchError, setFetchError] = useState(null)
  const[actividad, setActividad] = useState(null)

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
      <ContenedorActividad/>

      
    </>
  )
}