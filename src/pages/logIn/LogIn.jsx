import React, { useState } from 'react'
import { Stack, TextField, Button } from '@mui/material'
import styles from './LogIn.module.css'
import IconButton from '@mui/material/IconButton'
import { useNavigate } from 'react-router-dom'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import InputAdornment from '@mui/material/InputAdornment'
import { useAuthContext } from '@contexts/AuthContext'
import { supabase } from '@db-supabase/supabase.config'
import logInIMG from '@images/logInIMG.jpg'

const hoverButtons = {
  backgroundColor: '#028d34',
  color: 'white',
  width: '150px',
  '&:hover': {
    backgroundColor: 'white',
    color: '#028d34',
    transition: '0.2s',
    border: '1px solid #028d34'
  },
};

function LogIn() {
  // Obtener funciones y estado del contexto de autenticación
  const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn } = useAuthContext();
  
  // Estado para mostrar u ocultar la contraseña
  const [showPassword, setShowPassword] = useState(false);
  
  // Estados para almacenar los datos del formulario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Estados y mensajes de error para validación de campos
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [emailValidation, setEmailValidation] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState(false);
  
  // Navegación para redirigir después del inicio de sesión
  const navigate = useNavigate();

  const handleLogIn = async (e) => {
    e.preventDefault();

    // Verificar campos vacíos
    if (email === '') {
      setEmailErrorMessage("Debe ingresar un valor en el campo");
      setEmailValidation(true);
      return;
    } else {
      setEmailErrorMessage("");
      setEmailValidation(false);
    }

    if (password === '') {
      setPasswordErrorMessage("Debe ingresar un valor en el campo");
      setPasswordValidation(true);
      return;
    } else {
      setPasswordErrorMessage("");
      setPasswordValidation(false);
    }

    try {
      const { data, error } = await supabase
        .from("usuario")
        .select("*")
        .eq("correo", email);

      if (error) {
        console.log('Error al verificar las credenciales:', error.message);
        return;
      }

      const userData = data.find(user => user.correo === email);

      if (!userData) {
        setEmailErrorMessage("El correo es inválido. Verifique nuevamente.");
        setEmailValidation(true);
        return;
      } else {
        setEmailErrorMessage("");
        setEmailValidation(false);
      }

      if (userData.password !== password) {
        setPasswordErrorMessage("La contraseña es inválida. Ingrésela nuevamente");
        setPasswordValidation(true);
        return;
      } else {
        setPasswordErrorMessage("");
        setPasswordValidation(false);
      }

      setIsLoggedIn(true);
      setAuthUser({
        correo: userData.correo,
        type: userData.admin
      });

      // Almacenar información de usuario en localStorage
      localStorage.setItem('authUser', JSON.stringify({
        correo: userData.correo,
        type: userData.admin
      }));

      if (userData.admin === true) {
        navigate('/becarios');
      } else {
        navigate("/registroEstudiante");
      }

      setEmail('');
      setPassword('');
      setEmailValidation(false);
      setPasswordValidation(false);
      setEmailErrorMessage('');
      setPasswordErrorMessage('');
    } catch (error) {
      console.error('Error al iniciar sesión:', error.message);
      // Mostrar mensaje de error al usuario
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
                    src={logInIMG} 
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
