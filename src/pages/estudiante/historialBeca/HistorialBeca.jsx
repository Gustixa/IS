import React, { useState, useEffect } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { supabase } from '@db-supabase/supabase.config'
import { useAuthContext } from '@contexts/AuthContext'
import SideBar from '@components/sideBar'
import Title from '@components/titles'
import { StyledTableCell, StyledTableRow } from './muiStylesRegistro'
import {
  encabezados, registroHoras, registroActividades, encabezadosRegistro,
} from './encabezados'
import styles from './HistorialBeca.module.css'

export default function HistorialBeca() {
  const [dataRegistro, setDataRegistro] = useState([])
  const [loading, setLoading] = useState(true) // Estado para indicar si la petición se está cargando
  const [dataIncripcionActividad, setDataInscripcionActividad] = useState([])
  const [dataActividadBeca, setDataActividadBeca] = useState([])
  const [dataEstudianteBecado, setDataEstudianteBecado] = useState([])
  const combinedData = []
  // Obtener funciones y estado del contexto de autenticación
  const {
    authUser, setAuthUser, isLoggedIn, setIsLoggedIn,
  } = useAuthContext()

  const fetchDataRegistro = async () => {
    try {
      // Obtención de todas las actividades
      const { data: validacionManual, errorValidacionManual } = await supabase
        .from('validacion_manual_actividad')
        .select('*')
        .eq('correo_estudiante', authUser.correo)

      if (errorValidacionManual) {
        console.error('Error fetching data: ', error)
      } else {
        // Filtrar los datos para que coincidan con el correo del usuario actual
        setDataRegistro(validacionManual)
      }
      setLoading(false) // Indicar que la petición ha terminado
    } catch (error) {
      console.error('Error fetching data: ', error)
      setLoading(false) // Indicar que la petición ha terminado incluso si hay un error
    }
  }

  /**
   * Obtencion de las actividades beca en las que el estudiante, usuario actual, se ha inscrito
   * y estas han sido acreditadas.
   */
  const fetchInscripcionActividad = async () => {
    try {
      const { data: inscripcionActividad, error: errorInscripcionActividad } = await supabase
        .from('inscripcion_actividad')
        .select('*')
        .eq('correo_estudiante', authUser.correo)
        .eq('acreditada', true)

      if (inscripcionActividad) {
        setDataInscripcionActividad(inscripcionActividad)
      } else {
        console.log('Failed fetching data: ', errorInscripcionActividad)
      }
    } catch (error) {
      console.log('Failed fetchig data: ', error)
    }
  }

  /**
   * Obtencion de las actividades beca que han sido acreditadas
   */
  const fetchDataActividadBeca = async () => {
    try {
      const { data: actividadBeca, error: errorActividadBeca } = await supabase
        .from('actividad_beca')
        .select('*')
        .eq('acreditada', true)

      if (actividadBeca) {
        setDataActividadBeca(actividadBeca)
      } else {
        console.log('Failed fetching data: ', errorActividadBeca)
      }
    } catch (error) {
      console.log('Failed fetching data: ', error)
    }
  }

  /**
   * Obtencion de la informacion del estudiante que tiene sesion actual
   * Esto ayuda para mostrarle las horas que debe hacer durante el año.
   */
  const fetchEstudiante = async () => {
    try {
      const { data: estudianteBecado, error: errorEstudianteBecado } = await supabase
        .from('becado')
        .select('*')
        .eq('correo', authUser.correo)

      if (estudianteBecado) {
        setDataEstudianteBecado(estudianteBecado)
      } else {
        console.log('No data becado table: ', errorEstudianteBecado)
      }
    } catch (error) {
      console.log('Failed fetching data from becado table: ', error)
    }
  }
  useEffect(() => {
    fetchDataRegistro()
    fetchInscripcionActividad()
    fetchDataActividadBeca()
    fetchEstudiante()
  }, [])

  dataActividadBeca.forEach((actividadBeca) => {
    dataIncripcionActividad.forEach((inscripcionActividades) => {
      dataEstudianteBecado.forEach((estudiante) => {
        if (actividadBeca.id === inscripcionActividades.actividad_id
          && estudiante.correo === inscripcionActividades.correo_estudiante) {
          const combinedItem = { ...actividadBeca, ...dataRegistro, ...estudiante }
          combinedData.push(combinedItem)
        }
      })
    })
  })

  return (
    <>
      <SideBar />
      <Title titles={registroHoras} />
      {' '}
      {/* Título de la página */}
      <div className={styles.data}>
        <div className={styles.hoursInfo}>
          {dataEstudianteBecado.length > 0 ? (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    {encabezadosRegistro.map((encabezadoResgitro) => (
                      <StyledTableCell align="center" key={encabezadoResgitro}>{encabezadoResgitro}</StyledTableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <StyledTableRow>
                    <StyledTableCell align="center">{Math.abs(dataEstudianteBecado[0].horas_acumuladas)}</StyledTableCell>
                    <StyledTableCell align="center">{dataEstudianteBecado[0].horas_realizar}</StyledTableCell>
                    <StyledTableCell align="center">
                      {dataEstudianteBecado[0].horas_realizadas}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {dataEstudianteBecado[0].horas_realizar - dataEstudianteBecado[0].horas_realizadas}
                    </StyledTableCell>
                  </StyledTableRow>
                </TableBody>
              </Table>
            </TableContainer>
          ) : null}
        </div>
        {loading ? ( // Mostrar CircularProgress solo si la petición está en curso
          <CircularProgress />
        ) : (
          <>
            <Title titles={registroActividades} />
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    {encabezados.map((encabezado) => (
                      <StyledTableCell align="center" key={encabezado}>
                        {encabezado}
                      </StyledTableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {combinedData.length > 0 ? (
                    combinedData.map((item) => (
                      <StyledTableRow key={item.id}>
                        <StyledTableCell align="center">{item.nombre_actividad}</StyledTableCell>
                        <StyledTableCell align="center">{item.fecha}</StyledTableCell>
                        <StyledTableCell align="center">{item.organizador}</StyledTableCell>
                        <StyledTableCell align="center">{item.horas_acreditadas}</StyledTableCell>
                      </StyledTableRow>
                    ))
                  ) : (
                    // Mostrar mensaje de "No hay información" como una fila única
                    <StyledTableRow>
                      <StyledTableCell colSpan={encabezados.length} align="center">
                        No hay información
                      </StyledTableCell>
                    </StyledTableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </div>
    </>
  )
}
