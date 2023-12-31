import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { styled } from '@mui/material/styles'
import { makeStyles } from '@mui/styles'

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

export const useStyles = makeStyles(() => ({
  greenCell: {
    backgroundColor: 'green',
    color: 'white', // Cambia el color del texto si lo necesitas
  },
  redCell: {
    backgroundColor: '#c22604',
    color: 'white',
  },
}))

export const hoverButtons = {
  backgroundColor: '#028d34',
  color: 'white',
  whiteSpace: 'nowrap', // Evita saltos de línea
  width: 'auto', // Ancho automático para ajustar al contenido
  '&:hover': {
    backgroundColor: 'white',
    color: '#028d34',
    transition: '0.2s',
    border: '1px solid #028d34',
  },
}

export const hoverCancelButton = {
  backgroundColor: '#CE2222',
  color: 'white',
  width: '150px',
  '&:hover': {
    backgroundColor: 'white',
    color: '#CE2222',
    transition: '0.2s',
    border: '1px solid #CE2222',
  },
}
