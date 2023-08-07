import React, { useState, useEffect } from 'react'
import { Grid, Box, TextField, Button } from '@mui/material'
import SideBar from '@components/sideBar'
import styles from './CrearActividad.module.css'
import {textFieldStyles, hoverButtons} from './styles'
import { supabase } from '@db-supabase/supabase.config'

export default function CrearActividad() {
  const [name, setName] = useState("")

  const [nameErrorMessage, setNameErrorMessage] = useState("")

  const [nameValidation, setNameValidation] = useState(false)

  /**
   * Verificacion de los campos, que son datos requeridos para almacenar en la db
   */
  const validacionCampos = () => {
    let isValid = true;
    // nombre actividad
    if(!name){
      setNameValidation(true)
      setNameErrorMessage('Debe ingresar el nombre de la actividad')
      isValid = false
    }else{
      setNameValidation(false)
      setNameErrorMessage('')
    }
    console.log('isValid', isValid)
    return isValid
  }

  const handleAgregarActividad = async (e) => {
    e.preventDefault()
    
    try{
      console.log('llamada a validacion campos')
      if(!validacionCampos()){
        return      }else{
        console.log('salida')
        // Realizar la inserción en la tabla "activodad" con los datos de la actividad
        const { data, error} = await supabase
        .from('actividad')
        .insert([
          {
            nombre_actividad:name
          }
        ])
        console.log(data)
        console.log(error)
        // Insertar la actividad en la tabla "actividades"
        const { dataUser, errorUser } = await supabase
          .from('actividad')
          .insert([
            {
              email,
              contrasenia,
              admin: false,
            }
          ])
    
        if(data){
          console.log(data)
        }
      }
      
    }catch(error){
      console.error('Error al agregar la actividad:', error.message)
    }

    setName("")
  }

  return (
    <>
    <SideBar/>
    <div className={styles.title}>
      <h1>Apartado para agregar una nueva actividad</h1>
    </div>
    <div className={styles.container}>
      <Box px={8} pb={8}> {/* Agregamos el espaciado horizontal al contenedor  pb=horizontal, px=vertical*/}
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Nombre de la Actividad"
              variant="outlined"
              fullWidth
              style={textFieldStyles}
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={nameValidation}
              helperText={nameErrorMessage}
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
          onClick={(e) => handleAgregarActividad(e)}
        >
          Agregar actividad
        </Button>
      </Box>
    </div>
    </>
  )
}
