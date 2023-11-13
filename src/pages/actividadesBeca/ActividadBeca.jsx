import React, { useState, useEffect } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import TextField from '@mui/material/TextField'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@db-supabase/supabase.config'
import { useAuthContext } from '@contexts/AuthContext'
import SideBar from '@components/sideBar'
import ContenedorActividad from '@components/formatoActividadBeca'
import Title from '@components/titles'
import encabezado from './encabezado'
import hoverButtons from './muiStyles'
import styles from './ActividadBeca.module.css'

export default function ActividadBeca() {
  const [dataActividad, setDataActividad] = useState(null) // Estado para almacenar datos de actividades generales
  const [filtroNombreActividad, setFiltroNombreActividad] = useState('') // Estado para el filtro de nombre de actividad

  const {
    authUser,
    setAuthUser,
    isLoggedIn,
    setIsLoggedIn,
  } = useAuthContext() // Obtiene el contexto de autenticación del usuario

  const navigate = useNavigate() // Permite la navegación entre rutas

  // Función para manejar la eliminación de actividades
  const handleDelete = (id) => {
    setDataActividad((prevDataActivity) => prevDataActivity.filter((dataActi) => dataActi.id !== id))
  }

  // Funcion para manejar la inscripcion en las actividades.
  const handleSuscribe = (id) => {
    setDataActividad((prevDataActivity) => prevDataActivity.filter((dataActi) => dataActi.id !== id))
  }

  // Funcion para manejar las actividades que se han acreditado
  const handleAcreditar = (id) => {
    setDataActividad((prevDataActivity) => prevDataActivity.filter((dataActi) => dataActi.id !== id))
  }
  // Función para redirigir  a la creación de una nueva actividad
  const handleCreateActivity = () => {
    navigate('/nuevaActividad')
  }

  // Función para manejar el cambio en el filtro de nombre de actividad
  const handleFiltrarActividad = (e) => {
    setFiltroNombreActividad(e.target.value)
  }

  // Efecto para cargar las actividades generales
  useEffect(() => {
    const fetchActividad = async () => {
      try {
        // Obtener los IDs de las actividades en las que el usuario está inscrito
        const { data: inscripcionData, error: errorInscripcionData } = await supabase
          .from('inscripcion_actividad')
          .select('actividad_id')
          .eq('correo_estudiante', authUser.correo)

        if (errorInscripcionData) {
          console.log('Error fetching inscripcionData: ', errorInscripcionData)
        } else {
          // Obtener una lista de IDs de actividades inscritas
          const actividadIdsInscritas = inscripcionData.map((inscripcion) => inscripcion.actividad_id)

          // Obtener todas las actividades generales
          const { data: actividadData, error: errorActividadData } = await supabase
            .from('actividad_beca')
            .select('*')
            .order('id')
            .eq('acreditada', false)

          if (errorActividadData) {
            console.log('Error fetching actividadData: ', errorActividadData)
          } else {
            // Filtrar las actividades generales para excluir las inscritas
            const actividadesGenerales = actividadData.filter(
              (actividad) => !actividadIdsInscritas.includes(actividad.id),
            )

            // Filtrar las actividades generales por nombre
            const filteredData = actividadesGenerales.filter(
              (detalles) => detalles.nombre_actividad.toLowerCase().includes(filtroNombreActividad.toLowerCase()),
            )

            // Establecer los datos filtrados en el estado 'actividad'
            setDataActividad(filteredData)
          }
        }
      } catch (error) {
        console.error('Error fetching data: ', error)
      }
    }

    fetchActividad()
  }, [filtroNombreActividad, authUser.correo])

  return (
    <>
      <SideBar />
      {' '}
      {/* Barra lateral */}
      <Title titles={encabezado} />
      {' '}
      {/* Título de la página */}
      <div className={styles.buttonContainer}>
        {/* Campo de filtro de nombre de actividad */}
        <TextField
          label="Filtrar actividad por nombre"
          variant="outlined"
          onChange={(e) => handleFiltrarActividad(e)}
          sx={{ width: '250px' }}
          id="filtroActividades"
        />
        {/* Botón para crear una nueva actividad (solo visible para usuarios con tipo true) */}
        {authUser.type === true && (
          <Button
            onClick={() => handleCreateActivity()}
            sx={hoverButtons}
          >
            Crear Actividad
          </Button>
        )}
      </div>
      <div className={styles.display}>
        {/* Muestra las actividades generales con cupos disponibles */}
        {dataActividad !== null ? (
          dataActividad.map((detalles) => (
            // Verifica si el usuario autenticado es un administrador
            authUser.type === true || detalles.cupos_disponibles > 0 ? (
              <ContenedorActividad
                key={detalles.id}
                actividad={detalles}
                onDelete={handleDelete}
                inscrito={false} // Todas las actividades son generales
                onSuscribe={handleSuscribe}
                acreditada={false}
                onAcreditar={handleAcreditar}
              />
            ) : null
          ))
        ) : (
          <CircularProgress />
        )}
      </div>
      <div className={styles.finalBlock} />
    </>
  )
}
