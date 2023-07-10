import React, { useState } from 'react';
import { TextField, Button, Box, Stack } from '@mui/material';

const EventCalendar = ({ onAddEvent }) => {
  // Estado para el título del evento
  const [title, setTitle] = useState('');
  // Estado para la fecha de inicio
  const [startDate, setStartDate] = useState('');
  // Estado para la hora de inicio
  const [startTime, setStartTime] = useState('');
  // Estado para la fecha de finalización
  const [endDate, setEndDate] = useState('');
  // Estado para la hora de finalización
  const [endTime, setEndTime] = useState('');

  // Controlador de cambio de fecha de inicio
  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  // Controlador de cambio de hora de inicio
  const handleStartTimeChange = (e) => {
    setStartTime(e.target.value);
  };

  // Controlador de cambio de fecha de finalización
  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  // Controlador de cambio de hora de finalización
  const handleEndTimeChange = (e) => {
    setEndTime(e.target.value);
  };

  // Controlador de envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validaciones de los campos del formulario

    // Creación del nuevo evento con los valores actuales de los campos
    const newEvent = {
      title,
      start: new Date(
        getYear(startDate),
        getMonth(startDate),
        getDay(startDate),
        getHours(startTime),
        getMinutes(startTime)
      ),
      end: new Date(
        getYear(endDate),
        getMonth(endDate),
        getDay(endDate),
        getHours(endTime),
        getMinutes(endTime)
      )
    };

    // Llamada a la función onAddEvent para agregar el nuevo evento
    onAddEvent(newEvent);

    // Reinicio de los estados de los campos del formulario
    setTitle('');
    setStartDate('');
    setStartTime('');
    setEndDate('');
    setEndTime('');
  };

  // Función auxiliar para obtener el año de una fecha
  const getYear = (date) => {
    if (date) {
      const [year] = date.split('-');
      return parseInt(year, 10);
    }
    return new Date().getFullYear();
  };

  // Función auxiliar para obtener el mes de una fecha
  const getMonth = (date) => {
    if (date) {
      const [, month] = date.split('-');
      return parseInt(month, 10) - 1;
    }
    return new Date().getMonth();
  };

  // Función auxiliar para obtener el día de una fecha
  const getDay = (date) => {
    if (date) {
      const [, , day] = date.split('-');
      return parseInt(day, 10);
    }
    return new Date().getDate();
  };

  // Función auxiliar para obtener las horas de una hora
  const getHours = (time) => {
    if (time) {
      const [hours] = time.split(':');
      return parseInt(hours, 10);
    }
    return 0;
  };

  // Función auxiliar para obtener los minutos de una hora
  const getMinutes = (time) => {
    if (time) {
      const [, minutes] = time.split(':');
      return parseInt(minutes, 10);
    }
    return 0;
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Stack spacing={2}>
        {/* Campo de texto para el título del evento */}
        <TextField
          label="Título del evento"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ marginTop: '16px' }}
        />
        {/* Campo de fecha de inicio */}
        <TextField
          label="Fecha de inicio"
          type="date"
          value={startDate}
          onChange={handleStartDateChange}
        />
        {/* Campo de hora de inicio */}
        <TextField
          label="Hora de inicio"
          type="time"
          value={startTime}
          onChange={handleStartTimeChange}
        />
        {/* Campo de fecha de finalización */}
        <TextField
          label="Fecha de finalización"
          type="date"
          value={endDate}
          onChange={handleEndDateChange}
        />
        {/* Campo de hora de finalización */}
        <TextField
          label="Hora de finalización"
          type="time"
          value={endTime}
          onChange={handleEndTimeChange}
        />
        {/* Botón para agregar el evento */}
        <Button variant="contained" type="submit">
          Agregar evento
        </Button>
      </Stack>
    </Box>
  );
};

export default EventCalendar;
