import React, { useState } from 'react'
import { Stack, TextField, Button } from '@mui/material'
import styles from './LogIn.module.css'
import GoogleIcon from '@mui/icons-material/Google'
import { Link, useNavigate } from 'react-router-dom'

const hoverButtons = {
  '&:hover': {
    backgroundColor: 'rgba(1, 167, 245, 0.3)',
    color: 'black',
    transition: '0s',
  },
}
const firstIcon = {
  height: '25px',
  width: '25px',
  position: 'absolute',
  left: '30px',
  bottom: 0,
  top: '3px',
  alignSelf: 'flex-start',
  pointerEvents: 'none',
  display: 'flex',
}

function LogIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [emailErrorMessage, setEmailErrorMessage] = useState('')
  const [emailValidation, setEmailValidation] = useState(false)

  const [passwordErrorMessage, setPasswordErrorMessage] = useState('')
  const [passwordValidation, setPasswordValidation] = useState(false)

  const navigate = useNavigate()

  // Definiendo lo que pasara, en caso de seleccionar el boton logIn
  const handleLogIn = async (e) => {
    e.preventDefault()
    // Verifcando que no este vacio el campo
    if(email === ''){
      setEmailErrorMessage('Debe ingresar un valor en el campo')
      setEmailValidation(true)
    }
    if(password === ''){
      setPasswordErrorMessage('Debe ingresar un valor en el campo')
      setPasswordValidation(true)
    }
    //Arreglar en base a las verficacion de usuarios
    navigate('/')
  }
  
  return (
    <main>
      <div className={styles.degradado}>
        <div className={styles.Box}>
          <div className={styles.logInContainer}>
            <form action="">
              <h1 className={styles.tittle}>Iniciar Sesión</h1>
              <Stack spacing={4} direction="column">
                <TextField
                  id="email"
                  type="email"
                  variant="outlined"
                  label="Correo electronico"
                  onChange={
                    (e) => setEmail(e.target.value)
                    }
                  error={emailValidation}
                  helperText={emailErrorMessage}
                />
                <TextField
                  id="password"
                  type="password"
                  variant="outlined"
                  label="Contraseña"
                  onChange={
                    (e) => setPassword(e.target.value)
                  }
                  error={passwordValidation}
                  helperText={passwordErrorMessage}
                />
                <Button
                  size="medium"
                  sx={hoverButtons}
                  type="submit"
                  variant="outlined"
                  onClick={(e) => handleLogIn(e)}
                >
                  Iniciar Sesión
                </Button>
                
              </Stack>

            </form>
          </div>
        </div>
      </div>
    </main>
  )
}

export default LogIn
