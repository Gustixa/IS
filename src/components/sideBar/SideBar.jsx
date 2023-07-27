import React, { useState, useContext } from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import LogoutIcon from '@mui/icons-material/Logout'
import IconButton from '@mui/material/IconButton'
import Groups2Icon from '@mui/icons-material/Groups2'
import AppBar  from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import MenuIcon from '@mui/icons-material/Menu'
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import Grid from '@mui/material/Grid'
import HistoryEduIcon from '@mui/icons-material/HistoryEdu'
import uvgLogo from '@images/logo_uvgadmin.png'
import { useNavigate } from 'react-router-dom'
import HistoryIcon from '@mui/icons-material/History'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import AddIcon from '@mui/icons-material/Add'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import SummarizeIcon from '@mui/icons-material/Summarize'
import { useAuthContext } from '@contexts/AuthContext'
import styles from './SideBar.module.css'


// Elementos del sideBar para un administrador
const adminButtons = {
  'Agregar Estudiante':{
    icon: AddIcon,
    ruta: '/NuevoEstudiante'
  },
  'Consultar Estudiantes':{
    icon: Groups2Icon,
    ruta: '/becarios'
  },/*
  'Agendar Charla Delva': {
    icon: CalendarTodayIcon,
    ruta: '/delva'
  },*/
  'Actividades Beca':{
    icon: VolunteerActivismIcon,
    ruta: '/nuevaActividadBeca'
  }  
}
// Elementos del sideBar para un estudiante
const studentButtons = {
  'Historial Horas Beca': {
    icon: HistoryIcon,
    ruta:'/registroEstudiante'
  },
  'Actividades beca':{
    icon:CalendarMonthIcon,
    // MODIFICAR LA RUTA, PUES NO SERA LA RUTA RAIN 
    ruta: '/nuevaActividadBeca'
  }
}


export default function SideBar(){
  // MODIFICAR PARA USAR EL AUTHCONTEXT
    // utilizacion para poder ingresar el usuario de manera global en la app
    const { 
      authUser,
      setAuthUser,
      isLoggedIn,
      setIsLoggedIn} = useAuthContext()
  let buttons = {}

  const [state, setState] = useState({left: false})
  const toggleDrawer = (anchor, open) => (event) => {
    if(event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')){
      return
    }
    setState({...state,[anchor]: open})
  }
  
  const navigate = useNavigate()

  const handleButtonClick = (ruta) => {
    navigate(ruta)
  }
  console.log(authUser.type)

  // Verificando el usuario, para mostrar la pantalla correspondiente
  if(authUser && authUser.type === "admin"){
    buttons = adminButtons
  }
  if(authUser && authUser.type === "estudiante"){ 
    buttons = studentButtons
  }


  // Funcion que cierra sesión
  const handleLogOut = (e) => {
    setIsLoggedIn(false)
    navigate('/logIn')
  }
  // Creacion de los elementos para el sideBar
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {/* Se ajusta el tema de poder automatizar los elementos que aparecen en el sideBar */}
      <List>
        {Object.keys(buttons).map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => handleButtonClick(buttons[text].ruta)}>
              <ListItemIcon>
                {React.createElement(buttons[text].icon)}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {/* En este caso, no es necesario automatizar, pues es solo 1 elemento */}
        <ListItem key='Cerrar sesión' disablePadding>
          <ListItemButton onClick={() => handleLogOut()}>
            <ListItemIcon>
              <LogoutIcon/>
            </ListItemIcon>
            <ListItemText primary='Cerrar sesión' />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  )

  return (
      <Box sx={{ flexGrow: 1}}>
        {/* Creacion de la toolBar */}
        <AppBar position="static"
          sx={{backgroundColor:"#028d34"}}
        >
          <Toolbar variant='dense'>
            <IconButton edge="start" color="inherit"
              onClick={toggleDrawer('left', true)}
            >
              <MenuIcon/>
            </IconButton>
            <Grid container justifyContent="center">
              <img className={styles.uLogo} src={uvgLogo} alt="LOGO" />
            </Grid>
            {/* Crea el sideBar en la parte izquierda */}
            <Drawer
              anchor={'left'}
              open={state['left']}
              onClose={toggleDrawer('left', false)}
            >
              {/* Muestra el condtenido del sideBar */}
              {list('left')}
              
            </Drawer>
          </Toolbar>
        </AppBar>
      </Box>           
    
  )
}