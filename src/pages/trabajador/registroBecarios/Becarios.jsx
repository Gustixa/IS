import React, { useState, useEffect } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import SideBar from '@components/sideBar'
import { supabase } from '@db-supabase/supabase.config'
import styles from './Becarios.module.css'
import encabezados from './data'
import { StyledTableCell, StyledTableRow } from './muiStylesBecario'

export default function Becarios() {
  const [studentsData, setStudentsData] = useState([])
  const [filtroAnio, setFiltroAnio] = useState('')
  const [filtroNombre, setFiltroNombre] = useState('')
  const [filtroCarnet, setFiltroCarnet] = useState('')
  const [filtroBeca, setFiltroBeca] = useState('')
  const [filtroFacultad, setFiltroFacultad] = useState('')
  const [filtroHorasFaltantes, setFiltroHorasFaltantes] = useState('')

  const handleChangeAnio = (event) => {
    const inputValue = event.target.value;
    if (inputValue >= 0 || inputValue === '') {
      setFiltroAnio(inputValue);
    }
  };

  const handleChangeNombre = (event) => {
    setFiltroNombre(event.target.value);
  };

  const handleChangeCarnet = (event) => {
    const inputValue = event.target.value;
    if (inputValue >= 0 || inputValue === '') {
      setFiltroCarnet(inputValue);
    }
  };

  const handleChangeBeca = (event) => {
    const inputValue = event.target.value;
    if (inputValue >= 0 || inputValue === '') {
      setFiltroBeca(inputValue);
    }
  };

  const handleChangeFiltroFacultad = (event) => {
    setFiltroFacultad(event.target.value);
  };

  const handleChangeHorasFaltantes = (event) => {
    const inputValue = event.target.value;
    if (inputValue >= 0 || inputValue === '') {
      setFiltroHorasFaltantes(inputValue);
    }
  };

  const handleDelete = async (studentId) => {
    try {
      const { error } = await supabase.from('becado').delete().eq('id', studentId);

      if (error) {
        console.error('Error al eliminar el estudiante:', error);
      } else {
        setStudentsData((prevData) => prevData.filter((student) => student.id !== studentId));
      }
    } catch (error) {
      console.error('Error al eliminar el estudiante:', error);
    }
  };

  useEffect(() => {
    async function fetchStudentsData() {
      try {
        const { data, error } = await supabase.from('becado').select('*');

        if (error) {
          console.log('Error fetching data: ', error);
        } else {
          const filteredData = data.filter((student) => {
            return (
              student.anio.includes(filtroAnio) &&
              student.nombre_estudiante.toLowerCase().includes(filtroNombre.toLowerCase()) &&
              student.carnet.includes(filtroCarnet) &&
              (filtroBeca === '' || student.porcentaje_beca.toString().includes(filtroBeca)) &&
              (filtroFacultad === '' || student.facultad.toLowerCase().includes(filtroFacultad.toLowerCase())) &&
              (filtroHorasFaltantes === '' || student.horas_acumuladas >= parseInt(filtroHorasFaltantes))
            );
          });
          setStudentsData(filteredData);
        }
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    }
    fetchStudentsData();
  }, [filtroAnio, filtroNombre, filtroCarnet, filtroBeca, filtroFacultad, filtroHorasFaltantes]);

  return (
    <div>
      <SideBar />
      <Box component="form" className={styles.box}>
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
          sx={{ width: '200px' }}
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
      </Box>
      <div className={styles.data}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                {encabezados.map((encabezado) => (
                  <StyledTableCell key={encabezado}>{encabezado}</StyledTableCell>
                ))}
                <StyledTableCell align="right">Acciones</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {studentsData.length > 0 ? (
                studentsData.map((student) => (
                  <StyledTableRow key={student.id}>
                    <StyledTableCell component="th" scope="row">
                      {student.nombre_estudiante}
                    </StyledTableCell>
                    <StyledTableCell align="right">{student.carnet}</StyledTableCell>
                    <StyledTableCell align="right">{student.carrera}</StyledTableCell>
                    <StyledTableCell align="right">{student.facultad}</StyledTableCell>
                    <StyledTableCell align="right">{student.anio}</StyledTableCell>
                    <StyledTableCell align="right">{student.porcentaje_beca}</StyledTableCell>
                    <StyledTableCell align="right">{student.horas_realizar}</StyledTableCell>
                    <StyledTableCell align="right">{student.horas_acumuladas}</StyledTableCell>
                    <StyledTableCell align="right">
                      <IconButton
                        color="secondary"
                        aria-label="Eliminar estudiante"
                        onClick={() => handleDelete(student.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
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
