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
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import IconButton from '@mui/material/IconButton'
import { Link } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit'
import SideBar from '@components/sideBar'
import { supabase } from '@db-supabase/supabase.config'
import styles from './Becarios.module.css'
import encabezados from './data'
import { StyledTableCell, StyledTableRow, useStyles } from './muiStylesBecario'

export default function Becarios() {
  const [studentsData, setStudentsData] = useState([])
  const [filtroAnio, setFiltroAnio] = useState('')
  const [filtroNombre, setFiltroNombre] = useState('')
  const [filtroCarnet, setFiltroCarnet] = useState('')
  const [filtroBeca, setFiltroBeca] = useState('')
  const [filtroFacultad, setFiltroFacultad] = useState('')
  const [filtroHorasFaltantes, setFiltroHorasFaltantes] = useState('')
  const [filtroHorasCompletadas, setFiltroHorasCompletadas] = useState(null);
  const [filtroHorasSinCompletar, setFiltroHorasSinCompletar] = useState(false)

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

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

  useEffect(() => {
    async function fetchStudentsData() {
      try {
        const { data, error } = await supabase.from('becado').select('*')

        if (error) {
          console.log('Error fetching data: ', error)
        } else {
          let filteredData = data
          if (filtroHorasCompletadas !== null){
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
            control={<Checkbox checked={filtroHorasSinCompletar}/>} 
            label="Horas sin completar"
            onChange={handleChangeHorasSinCompletar} 
            sx={{ marginLeft: '40px' }}
          />
          <Button
            
          >
            <CSVLink
                data={studentsData}
                filename={'becarios.csv'}
                className={styles.exportButton}
              >
                Exportar a CSV
              </CSVLink>
            </Button>
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
                      {student.horas_realizar - student.horas_realizadas}
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
