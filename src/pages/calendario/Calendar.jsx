import React, { useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import Button from '@mui/material/Button'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import SideBar from '@components/sideBar'
import EventCalendar from '@components/eventosCalendario'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Paper from '@mui/material/Paper'
import Draggable from 'react-draggable'

const localizer = momentLocalizer(moment)

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props}/>
    </Draggable>
  )
}

export default function Calendario() {
  const [events, setEvents] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  

  const handleAddEvent = (newEvent) => {
    setEvents([...events, newEvent])
  }

  const handleToggleForm = () => {
    setShowForm(!showForm);
  }

  const handleOpenDialog = () => {
    setOpenDialog(true);
  }

  const handleCloseDialog = () => {
    setOpenDialog(false);
  }

  return (
    <div>
      <SideBar></SideBar>
      <h1>Calendario</h1>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
      <Button
        variant="contained"
        onClick={handleOpenDialog}
      >
        Agregar evento
      </Button>
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog}
        PaperComponent={PaperComponent}
        aria-aria-labelledby="draggable-dialog-title"
        >
        <DialogTitle style={{ cursor:'move'}} id="draggable-dialog-title">Agregar Evento</DialogTitle>
        <DialogContent>
          <EventCalendar onAddEvent={handleAddEvent} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
