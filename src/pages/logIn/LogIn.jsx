import React, { useState } from 'react'
import { Stack, TextField, Button } from '@mui/material'
import styles from './LogIn.module.css'
import GoogleIcon from '@mui/icons-material/Google'
import IconButton from '@mui/material/IconButton'
import { useNavigate } from 'react-router-dom'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import InputAdornment from '@mui/material/InputAdornment'
import { useAuthContext } from '@contexts/AuthContext'
import { supabase } from '@db-supabase/supabase.config'


// Modificar las propiedades del boton como en css
const hoverButtons = {
  backgroundColor:'#028d34',
  color:'white',
  width:'150px',
  '&:hover': {
    backgroundColor: 'white',
    color: '#028d34',
    transition: '0.2s',
    border:'1px solid #028d34'
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
  // utilizacion para poder ingresar el usuario de manera global en la app
  const { 
    authUser,
    setAuthUser,
    isLoggedIn,
    setIsLoggedIn} = useAuthContext()
  
  // Funciona para poder mostrar la contraseña u ocultarla
  const [showPassword, setShowPassword] = useState(false)
  
  // Almacenan los datos de sus respectivos campos
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Almacenan el mensaje de cada campo, segun el caso
  const [emailErrorMessage, setEmailErrorMessage] = useState('')
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('')

  // Funcionana para setear el mensaje de error en caso de ser necesario
  const [emailValidation, setEmailValidation] = useState(false)
  const [passwordValidation, setPasswordValidation] = useState(false)

  

  const navigate = useNavigate()

  // Definiendo lo que pasara, en caso de seleccionar el boton logIn
  const handleLogIn = async (e) => {
    e.preventDefault()
    // Verifcando que no este vacio el campo
    if(email === ''){
      setEmailErrorMessage("Debe ingresar un valor en el campo")
      setEmailValidation(true)
      return
    }else{
      setEmailErrorMessage("")
      setEmailValidation(false)
    }

    if(password === ''){
      setPasswordErrorMessage("Debe ingresar un valor en el campo")
      setPasswordValidation(true)
      return
    }else{
      setPasswordErrorMessage("")
      setPasswordValidation(false)
    }
    /**
     * Arreglar segun se estructure.
     * El punto, es enviar el tipo de usuario, para poder mostrar una u otra pantalla
     */

    try{
      const { data, error } = await supabase
        .from("usuario")
        .select("*")
        .eq("correo",email)
      if(error){
        // Mostrar un mensaje de error al usuario, por ejemplo, con una notificación o un mensaje en pantalla
        console.log('Error al verificar las credenciales:', error.message)
        return
      }
      
      const userData = data.find(user => user.correo === email)
      if (!userData) {
        // Si no se encuentra un usuario con el correo proporcionado
        setEmailErrorMessage("El correo es invalido. Verifique nuevamente.")
        setEmailValidation(true)
        return
      }else{
        setEmailErrorMessage("")
        setEmailValidation(false)
      }
      
      
      if (userData.password !== password) {
        // Si se encontró el usuario pero la contraseña no coincide
        setPasswordErrorMessage("La contraseña es inválida. Ingrésela nuevamente")
        setPasswordValidation(true)
        return
      }else{
        setPasswordErrorMessage("")
        setPasswordValidation(false)
      }
      // Si las credenciales son correctas, establece la información del usuario en el contexto de autenticación
      setIsLoggedIn(true)
      setAuthUser({
        name: userData.correo, // Obtener el correo desde el campo de la tabla
        type: userData.admin // obtener el tipo de usuario desde el campo de la tabla
      })
      
      if(!data && data.admin === true){
        navigate('/becarios')  
      }else{
        navigate('/registroEstudiante')  
      }
      // Limpia los campos y mensajes de error después del inicio de sesión exitoso
      setEmail('')
      setPassword('')
      setEmailValidation(false)
      setPasswordValidation(false)
      setEmailErrorMessage('')
      setPasswordErrorMessage('')
    }catch(error){
      console.error('Error al iniciar sesión:', error.message);
      // Mostrar un mensaje de error al usuario, por ejemplo, con una notificación o un mensaje en pantalla
      // MODIFICIAR
    }
    
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
                  type={showPassword ? 'text' : 'password'}
                  variant="outlined"
                  label="Contraseña"
                  onChange={
                    (e) => setPassword(e.target.value)
                  }
                  error={passwordValidation}
                  helperText={passwordErrorMessage}
                  InputProps={{
                    endAdornment:(
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          onMouseDown={(e) => e.preventDefault()}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    )

                  }}
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
