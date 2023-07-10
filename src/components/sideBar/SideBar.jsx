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
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import logoUVG from '@images/logoUvg.png'
import uvgLogo from '@images/logo_uvgadmin.png'
import { useNavigate } from 'react-router-dom'
import styles from './SideBar.module.css'


// Elementos del SideBar
const buttonData = {
  'Charlas Delva': {
    icon: Groups2Icon,
    ruta: '/delva'
  },
  'Horas Beca':{
    icon: HistoryEduIcon,
    ruta: '/registro'
  },
  'Actividad Beca':{
    icon: VolunteerActivismIcon,
    ruta: '/actividadBeca'
  } 
}


export default function SideBar(){
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

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {/* Se ajusta el tema de poder automatizar los elementos que aparecen en el sideBar */}
      <List>
        {Object.keys(buttonData).map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => handleButtonClick(buttonData[text].ruta)}>
              <ListItemIcon>
                {React.createElement(buttonData[text].icon)}
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
        <AppBar position="static"
          sx={{backgroundColor:"#028d34"}}
        >
          <Toolbar variant='dense'
            
          >

            <IconButton edge="start" color="inherit"
              onClick={toggleDrawer('left', true)}
            >
              <MenuIcon/>
            </IconButton>
            <Grid container justifyContent="center">
              <img className={styles.uLogo} src={uvgLogo} alt="LOGO" />
            </Grid>
              
            
            
            <Drawer
              anchor={'left'}
              open={state['left']}
              onClose={toggleDrawer('left', false)}
            >
              <Card>
                <CardMedia
                  component="img"
                  alt="Logo UVG"
                  height="60"
                  image={logoUVG}
                >
                </CardMedia>
              </Card>
              {list('left')}
              
            </Drawer>
          </Toolbar>
        </AppBar>
      </Box>           
    
  )
}