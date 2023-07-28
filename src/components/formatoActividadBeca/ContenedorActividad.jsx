import React from 'react'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import { createTheme, ThemeProvider, styled } from '@mui/material/styles'

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: '60px',
  borderRadius:'20'
}));

const lightTheme = createTheme({ palette: { mode: 'light' } });

export default function ContenedorActividad() {
  return (
    <>
      <ThemeProvider theme={lightTheme}>
        <Item key={6} elevation={6}>
          {`Nada=${6}`}
        </Item>
      </ThemeProvider>
    </>
  )
}