import React, { useState } from 'react'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Title from '@components/titles'
import SideBar from '@components/sideBar'
import styles from './Becarios.module.css'
import encabezados from './data'

// Estilo del boton
const hoverButtons = {
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

export default function Becarios(){
  const[vlaue, setValue] = useState('')
  
  const handleChange = (event) => {
    const inputValue = event.target.value
    if(inputValue >= 0 || inputValue === ''){
      setValue(inputValue)
    }
  }
  return (
    <div>
     <SideBar/>
      
      <Box
        component="form"
        className={styles.box}
      >
        <TextField
          className={styles.input}
          label="Filtrar por año"
          variant="outlined"
          type="number"
          onChange={handleChange}
          inputProps={{min: '0'}}
          InputLabelProps={{
            shrink: true
          }}
        />
        <TextField
          className={styles.input}
          label="Filtrar por nombre"
          variant="outlined"
        />
        <TextField
          className={styles.input}
          label="Filtrar por carnet"
          variant="outlined"
          type="number"
          onChange={handleChange}
          inputProps={{min: '0'}}
          InputLabelProps={{
            shrink:true
          }}
        />
        <TextField
          className={styles.input}
          label="Filtrar por % beca"
          variant="outlined"
          type="number"
          onChange={handleChange}
          inputProps={{min: '0'}}
          InputLabelProps={{
            shrink: true
          }}
        />
        <TextField
          className={styles.input}
          label="Filtrar por horas beca realizadas"
          variant="outlined"
          type="number"
          onChange={handleChange}
          inputProps={{min: '0'}}
          InputLabelProps={{
            shrink: true
          }}
        />
        <TextField
          className={styles.input}
          label="Filtrar por horas beca faltantes"
          variant="outlined"
          type="number"
          onChange={handleChange}
          inputProps={{min: '0'}}
          InputLabelProps={{
            shrink: true
          }}
        />
      </Box>
      <div className={styles.filterButton}>
        <Button
          variant="contained"
          sx={hoverButtons}
        >
          Filtrar
        </Button>
      </div>
      <div>
        <Title
          titles={encabezados}
        ></Title>
      </div>
      
    </div>
  )
}