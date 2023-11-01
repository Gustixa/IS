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
import { useAuthContext } from '@contexts/AuthContext'

const localizer = momentLocalizer(moment)

const hoverButtons = {
  backgroundColor: '#028d34',
  color: 'white',
  width: '175px',
  marginLeft: '10px',
  marginTop: '10px',
  '&:hover': {
    backgroundColor: 'white',
    color: '#028d34',
    transition: '0.2s',
    border: '1px solid #028d34',
  },
}

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  )
}

export default function Calendario() {
  const [events, setEvents] = useState([])
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [openDialog, setOpenDialog] = useState(false)
  const { authUser } = useAuthContext()

  const handleAddEvent = (newEvent) => {
    setEvents([...events, newEvent])
  }

  const handleOpenDialog = () => {
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  return (
    <div>
      <SideBar />
      <h1>Calendario</h1>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        onSelectEvent={(event) => setSelectedEvent(event)}
      />
      <Button
        variant="contained"
        onClick={handleOpenDialog}
        sx={hoverButtons}
      >
        Actividad Beca
      </Button>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        PaperComponent={PaperComponent}
        aria-aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Detalles de la actividad
        </DialogTitle>
        <DialogContent>
          {/** Verificar el tipo de usuario */}
          {authUser.type === 'admin'
            ? (
              <EventCalendar onAddEvent={handleAddEvent} />
            ) : (<></>)}
          {events && authUser && authUser.type === 'estudiante' ? (
            <div />
          ) : (
            <p>No se ha seleccionado ninguna actividad o el usuario no es un estudiante.</p>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
