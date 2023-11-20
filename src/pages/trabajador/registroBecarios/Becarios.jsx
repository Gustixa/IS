import React, { useState, useEffect } from 'react'
import { CSVLink } from 'react-csv'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import { Button } from '@mui/material'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'

import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import IconButton from '@mui/material/IconButton'
import { Link } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit'
import SideBar from '@components/sideBar'
import { supabase } from '@db-supabase/supabase.config'
import styles from './Becarios.module.css'
import encabezados from './data'
import {
  StyledTableCell,
  StyledTableRow,
  useStyles,
  hoverButtons,
  hoverCancelButton,
} from './muiStylesBecario'

function PaperComponent(props) {
  return (
    <Paper {...props} />
  )
}

export default function Becarios() {
  const [studentsData, setStudentsData] = useState([])
  const [filtroAnio, setFiltroAnio] = useState('')
  const [filtroNombre, setFiltroNombre] = useState('')
  const [filtroCarnet, setFiltroCarnet] = useState('')
  const [filtroBeca, setFiltroBeca] = useState('')
  const [filtroFacultad, setFiltroFacultad] = useState('')
  const [filtroHorasFaltantes, setFiltroHorasFaltantes] = useState('')
  const [filtroHorasCompletadas, setFiltroHorasCompletadas] = useState(null)
  const [filtroHorasSinCompletar, setFiltroHorasSinCompletar] = useState(false)

  const [actividadesBeca, setActividadesBeca] = useState([])
  const [inscripcionesActividades, setInscripcionesActividades] = useState([])

  const [openDialog, setOpenDialog] = useState(false)

  const handleOpenDialog = () => {
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

  const classes = useStyles()

  /**
   * Filtro para el año
   * @param {*} event
   */
  const handleChangeAnio = (event) => {
    const inputValue = event.target.value
    if (inputValue >= 0 || inputValue === '') {
      setFiltroAnio(inputValue)
    }
  }

  /**
   * Filtro para el nombre
   * @param {*} event
   */
  const handleChangeNombre = (event) => {
    setFiltroNombre(event.target.value)
  }

  /**
   * Filtro por carnet
   * @param {*} event
   */
  const handleChangeCarnet = (event) => {
    const inputValue = event.target.value
    if (inputValue >= 0 || inputValue === '') {
      setFiltroCarnet(inputValue)
    }
  }

  /**
   * Filtro por porcentaje de beca
   * @param {*} event
   */
  const handleChangeBeca = (event) => {
    const inputValue = event.target.value
    if (inputValue >= 0 || inputValue === '') {
      setFiltroBeca(inputValue)
    }
  }

  /**
   * Filtro de la facultad de la carrera
   * @param {*} event
   */
  const handleChangeFiltroFacultad = (event) => {
    setFiltroFacultad(event.target.value)
  }

  /**
   *
   * @param {*} event
   */
  const handleChangeHorasFaltantes = (event) => {
    const inputValue = event.target.value
    if (inputValue >= 0 || inputValue === '') {
      setFiltroHorasFaltantes(inputValue)
    }
  }

  const handleChangeHorasCompletadas = (event) => {
    setFiltroHorasCompletadas(event.target.checked)
    // Limpia el filtro de horas faltantes cuando se marca "Horas Completadas"
    setFiltroHorasFaltantes('')
  }

  const handleChangeHorasSinCompletar = (event) => {
    // Invierte el valor del estado de "Horas Completadas"
    setFiltroHorasSinCompletar(event.target.checked)
    // Limpia el filtro de horas faltantes cuando se marca "Horas Sin Completar"
    setFiltroHorasFaltantes('')
  }

  /**
   * Obtencion de la informacion de la tabla actividad_beca, para poder descargarla
   */
  const handleActivityData = async () => {
    const { data: obtencionActividades, error: errorObtencionActividades } = await supabase
      .from('actividad_beca')
      .select('*')

    setActividadesBeca(obtencionActividades)
  }

  /**
   * Obtencion de las inscripciones del año, esto con el fin de poder
   * descargar la informacion
   */
  const handleInscripcionesData = async () => {
    const { data: obtencionInscripciones, error: errorObtencionInscripciones } = await supabase
      .from('inscripcion_actividad')
      .select('*')
    setInscripcionesActividades(obtencionInscripciones)
  }

  /**
   * Eliminacion de las actividades e inscripciones que ya han sido acreditadasS
   */
  const handleDeleteData = async () => {
    const { data: actividadesBeca, error: errorActividadesBeca } = await supabase
      .from('actividad_beca')
      .delete()
      .eq('acreditada', true)

    const { data: inscripcionesActividades, error: errorInscripcionesActividades } = await supabase
      .from('inscripcion_actividad')
      .delete()
      .eq('acreditada', true)
  }

  /**
   *
   */
  const handleUpdateStudentData = async () => {
    const { data: studentData, error: errorStudentData } = await supabase
      .from('becado')
      .select('*')

    // Utiliza Promise.all para realizar todas las actualizaciones de forma concurrente
    await Promise.all(studentData.map(async (student) => {
      const {
        horas_realizadas, horas_realizar, horas_faltantes, horas_acumuladas,
      } = student

      // Calcular el excedente de horas
      const excedenteHoras = horas_acumuladas + Math.max(horas_realizadas - horas_realizar, 0)
      const horasIncompletas = horas_faltantes + Math.max(horas_realizar - horas_realizadas, 0)
      const horasRealizarSiguienteCiclo = horas_realizar

      // Actualizar la columna horas_acumuladas
      return supabase
        .from('becado')
        .update({
          acumulado_anual: excedenteHoras,
          horas_realizadas: 0,
          horas_faltantes: horasIncompletas,
          horas_realizar: horasRealizarSiguienteCiclo,
          horas_acumuladas: excedenteHoras,
        })
        .eq('id', student.id)
    }))
  }

  useEffect(() => {
    async function fetchStudentsData() {
      try {
        const { data, error } = await supabase.from('becado').select('*')

        if (error) {
          console.log('Error fetching data: ', error)
        } else {
          let filteredData = data
          if (filtroHorasCompletadas !== null) {
            filteredData = data.filter((student) => (
              student.anio.includes(filtroAnio)
                && student.nombre_estudiante.toLowerCase().includes(filtroNombre.toLowerCase())
                && student.carnet.includes(filtroCarnet)
                && (filtroBeca === '' || student.porcentaje_beca.toString().includes(filtroBeca))
                && (filtroFacultad === '' || student.facultad.toLowerCase().includes(filtroFacultad.toLowerCase()))
                && (filtroHorasFaltantes === '' || student.horas_acumuladas >= parseInt(filtroHorasFaltantes, 10))
                && (!filtroHorasCompletadas || (student.horas_realizadas >= student.horas_realizar))
                && (!filtroHorasSinCompletar || (student.horas_realizadas < student.horas_realizar))
            ))
          }

          setStudentsData(filteredData)
        }
      } catch (error) {
        console.error('Error fetching data: ', error)
      }
    }
    fetchStudentsData()
  }, [filtroAnio,
    filtroNombre,
    filtroCarnet,
    filtroBeca,
    filtroFacultad,
    filtroHorasFaltantes,
    filtroHorasCompletadas,
    filtroHorasSinCompletar])

  return (
    <div>
      <SideBar />
      <Box component="form" className={styles.box}>
        <div className={styles.inputContainer}>
          <TextField
            className={styles.input}
            label="Filtrar por año"
            variant="outlined"
            type="number"
            onChange={handleChangeAnio}
            inputProps={{ min: '0' }}
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ width: '150px' }}
          />
          <TextField
            className={styles.input}
            label="Filtrar por nombre"
            variant="outlined"
            onChange={handleChangeNombre}
          />
          <TextField
            className={styles.input}
            label="Filtrar por carnet"
            variant="outlined"
            type="number"
            onChange={handleChangeCarnet}
            inputProps={{ min: '0' }}
            id="filterCarne"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            className={styles.input}
            label="Filtrar por % beca"
            variant="outlined"
            type="number"
            onChange={handleChangeBeca}
            inputProps={{ min: '0' }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            className={styles.input}
            label="Filtrar por Facultad"
            variant="outlined"
            type="text"
            onChange={handleChangeFiltroFacultad}
            inputProps={{ min: '0' }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            className={styles.input}
            label="Filtrar por horas acumuladas"
            variant="outlined"
            type="number"
            onChange={handleChangeHorasFaltantes}
            inputProps={{ min: '0' }}
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ width: '200px' }}
          />
          <FormControlLabel
            control={<Checkbox checked={filtroHorasCompletadas} />}
            label="Horas completadas"
            onChange={handleChangeHorasCompletadas}
            sx={{ marginLeft: '40px' }}
          />
          <FormControlLabel
            control={<Checkbox checked={filtroHorasSinCompletar} />}
            label="Horas sin completar"
            onChange={handleChangeHorasSinCompletar}
            sx={{ marginLeft: '40px' }}
          />
          <Button
            onClick={() => handleOpenDialog()}
            sx={{ ...hoverButtons }}
          >
            Finalizar Año
          </Button>
          <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            PaperComponent={PaperComponent}
            aria-labelledby="draggable-dialog-title"
          >
            <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
              Confirmar finalización de ciclo.
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                ¿Estás seguro de que desea
                Finalizar este ciclo estudiantil?

                Esta accion depurara la tabla de actividades e inscripciones que se han
                acreditado, para liberar espacio. SE RECOMIENDA DESCARGAR LOS SIGUIENTES
                ARCHIVOS, estos poseen la informacion de las tablas, segun la etiqueta
                de cada boton.
              </DialogContentText>
              <div className={styles.descargas}>
                <div>
                  <CSVLink
                    data={studentsData}
                    filename="becarios.csv"
                    className={styles.exportButton}
                  >
                    Estudiantes
                  </CSVLink>
                </div>
                <div>
                  <CSVLink
                    data={actividadesBeca}
                    onClick={() => handleActivityData()}
                    filename="actividades.csv"
                    className={styles.exportButton}
                  >
                    Actividades
                  </CSVLink>
                </div>
                <div>
                  <CSVLink
                    data={inscripcionesActividades}
                    onClick={() => handleInscripcionesData()}
                    filename="inscripciones.csv"
                    className={styles.exportButton}
                  >
                    Inscripciones
                  </CSVLink>
                </div>
              </div>
            </DialogContent>
            <DialogActions>
              <Button
                autoFocus
                sx={{ ...hoverButtons }}
                onClick={() => {
                  handleCloseDialog()
                  handleDeleteData()
                  handleUpdateStudentData()
                }}
              >
                Confirmar
              </Button>
              <Button
                sx={hoverCancelButton}
                autoFocus
                onClick={handleCloseDialog}
              >
                Cancelar
              </Button>
            </DialogActions>
          </Dialog>

        </div>
      </Box>
      <div className={styles.data}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                {encabezados.map((encabezado) => (
                  <StyledTableCell align="center" key={encabezado}>{encabezado}</StyledTableCell>
                ))}
                <StyledTableCell align="right">Acciones</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {studentsData.length > 0 ? (
                studentsData.map((student) => (
                  <StyledTableRow key={student.id}>
                    <StyledTableCell
                      component="th"
                      scope="row"
                      className={
                        student.horas_realizadas >= student.horas_realizar
                          ? classes.greenCell
                          : classes.redCell
                      }
                    >
                      {student.nombre_estudiante}
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      className={
                        student.horas_realizadas >= student.horas_realizar
                          ? classes.greenCell
                          : classes.redCell
                      }
                    >
                      {student.carnet}
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      className={
                        student.horas_realizadas >= student.horas_realizar
                          ? classes.greenCell
                          : classes.redCell
                      }
                    >
                      {student.carrera}
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      className={
                        student.horas_realizadas >= student.horas_realizar
                          ? classes.greenCell
                          : classes.redCell
                      }
                    >
                      {student.facultad}
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      className={
                        student.horas_realizadas >= student.horas_realizar
                          ? classes.greenCell
                          : classes.redCell
                      }
                    >
                      {student.anio}
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      className={
                        student.horas_realizadas >= student.horas_realizar
                          ? classes.greenCell
                          : classes.redCell
                      }
                    >
                      {student.porcentaje_beca}
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      className={
                        student.horas_realizadas >= student.horas_realizar
                          ? classes.greenCell
                          : classes.redCell
                      }
                    >
                      {student.horas_realizar}
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      className={
                        student.horas_realizadas >= student.horas_realizar
                          ? classes.greenCell
                          : classes.redCell
                      }
                    >
                      {student.horas_realizadas}
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      className={
                        student.horas_realizadas >= student.horas_realizar
                          ? classes.greenCell
                          : classes.redCell
                      }
                    >
                      {student.horas_realizar - student.horas_realizadas - student.horas_acumuladas}
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      className={
                        student.horas_realizadas >= student.horas_realizar
                          ? classes.greenCell
                          : classes.redCell
                      }
                    >
                      {student.horas_acumuladas}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Link to={`/actualizarEstudiante/${student.id}`}>
                        <IconButton
                          color="primary"
                          aria-label="Eliminar estudiante"
                        >
                          <EditIcon />
                        </IconButton>
                      </Link>
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              ) : (
                <StyledTableRow>
                  <StyledTableCell colSpan={9} align="center">
                    <CircularProgress />
                  </StyledTableCell>
                </StyledTableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  )
}
