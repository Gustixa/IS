import React, { useState } from 'react'
import { Stack, TextField, Button } from '@mui/material'
import styles from './LogIn.module.css'
import GoogleIcon from '@mui/icons-material/Google'
import { useNavigate } from 'react-router-dom'

// Modificar las propiedades del boton como en css
const hoverButtons = {
  backgroundColor:'#028d34',
  color:'white',
  width:'150px',
  '&:hover': {
    backgroundColor: 'white',
    color: '#028d34',
    transition: '0.2s',
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
              <Stack spacing={3} direction="column">
                <div className={styles.imageContainer}>
                  <img 
                    className={styles.image}
                    src="https://tienda.uvg.edu.gt/attach/tiendas/Logo-vertical-verde_5a8b26cb76441.jpg" 
                    alt="logo"/>
                </div>
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
                <div className={styles.buttonPosition}>
                  <Button
                    size="medium"
                    sx={hoverButtons}
                    type="submit"
                    variant="outlined"
                    onClick={(e) => handleLogIn(e)}
                  >
                    Iniciar Sesión
                  </Button>
                </div>              
              </Stack>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}

export default LogIn
