import React from 'react'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import { createTheme, ThemeProvider, styled } from '@mui/material/styles'

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: '60px',
}))

const lightTheme = createTheme({ palette: { mode: 'light' } })

export default function Title({ titles }) {
  const columnSize = `repeat(${titles.length}, 1fr)` // Calcular la cantidad de columnas
  return (
    <>
    {[lightTheme].map((theme, index) => (
        <Grid item xs={6} key={index}>
          <ThemeProvider theme={theme}>
            <Box
              sx={{
                p: 2,
                bgcolor: 'background.default',
                display: 'grid',
                gridTemplateColumns: columnSize, // Establecer el espacio de las columnas, segun su cantidad
                gap: 2,
              }}
            >
              {titles.map((element,index) => (
                <Item key={6} elevation={6}>
                  {element}
                </Item>
              ))}
            </Box>
          </ThemeProvider>
        </Grid>
      ))}
    </>
  )
}