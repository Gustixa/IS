import React, { useState, KeyboardEvent, MouseEvent } from 'react'
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
import styles from './SideBar.module.css'


// Elementos del sideBar para un administrador
const adminButtons = {
  'Crear actividad Beca': {
    icon: Groups2Icon,
    ruta: '/actividadBeca'
  },
  'Estudiantes becados':{
    icon: HistoryEduIcon,
    ruta: '/becarios'
  },
  
}
// Elementos del sideBar para un estudiante
const studentButtons = {
  'Historial Horas Beca': {
    icon: HistoryIcon,
    ruta:'/registroEstudiante'
  },
  'Actividades beca':{
    icon:CalendarMonthIcon,
    ruta:'/actividadBecario'
  }
}


export default function SideBar({ tipoUsuario }){
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
  // Verificando el usuario, para mostrar la pantalla correspondiente
  if( tipoUsuario === "admin"){
    buttons = adminButtons
  }
  if( tipoUsuario === "estudiante"){
    buttons = studentButtons
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
          <ListItemButton>
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