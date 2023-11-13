import React from 'react'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import { createTheme, ThemeProvider, styled } from '@mui/material/styles'
import styles from './Title.module.css'

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: '60px',
  fontSize: '20px',
  fontWeight: 'bold',
  overflow: 'hidden', // Oculta el texto que se desborda del contenedor
}))

const lightTheme = createTheme({ palette: { mode: 'light' } })

export default function Title({ titles }) {
  const columnSize = `repeat(${titles.length}, 1fr)` // Calcular la cantidad de columnas

  return (
    <div className={styles.container}>
      {[lightTheme].map((theme, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <ThemeProvider theme={theme}>
            <Box
              sx={{
                p: 2,
                bgcolor: 'background.default',
                display: 'grid',
                gridTemplateColumns: columnSize,
                gap: 2,
              }}
            >
              {titles.map((element, index) => (
                <Item key={index} elevation={6}>
                  {element}
                </Item>
              ))}
            </Box>
          </ThemeProvider>
        </Grid>
      ))}
    </div>
  )
}
