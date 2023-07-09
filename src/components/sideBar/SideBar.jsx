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
import HistoryEduIcon from '@mui/icons-material/HistoryEdu'

// Elementos del SideBar
const buttonData = {
  'Charlas Delva': Groups2Icon,
  'Horas Beca': HistoryEduIcon
}


export default function SideBar(){
  const [state, setState] = useState({left: false})
  const toggleDrawer = (anchor, open) => (event) => {
    if(event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')){
      return
    }
    setState({...state,[anchor]: open})
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
            <ListItemButton>
              <ListItemIcon>
                {React.createElement(buttonData[text])}
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
        <AppBar position="static">
          <Toolbar variant='dense'>
            <IconButton edge="start" color="inherit"
              onClick={toggleDrawer('left', true)}
            >
              <MenuIcon/>
            </IconButton>
            <Drawer
              anchor={'left'}
              open={state['left']}
              onClose={toggleDrawer('left', false)}
            >
              {list('left')}
            </Drawer>
          </Toolbar>
        </AppBar>
      </Box>           
    
  )
}