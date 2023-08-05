import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { styled } from '@mui/material/styles'

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

// Estilo del boton
export const hoverButtons = {
  backgroundColor:'#028d34',
  color:'white',
  width:'125px',
  marginLeft:'10px',
  marginTop:'10px',
  '&:hover': {
    backgroundColor: 'white',
    color: '#028d34',
    transition: '0.2s',
    border:'1px solid #028d34'
  },
}