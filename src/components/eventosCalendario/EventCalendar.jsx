import React, { useState } from 'react';
import { TextField, Button, Box, Stack } from '@mui/material';

const EventCalendar = ({ onAddEvent }) => {
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleStartTimeChange = (e) => {
    setStartTime(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleEndTimeChange = (e) => {
    setEndTime(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validaciones de los campos del formulario

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

    onAddEvent(newEvent);
    setTitle('');
    setStartDate('');
    setStartTime('');
    setEndDate('');
    setEndTime('');
  };

  const getYear = (date) => {
    if (date) {
      const [year] = date.split('-');
      return parseInt(year, 10);
    }
    return new Date().getFullYear();
  };

  const getMonth = (date) => {
    if (date) {
      const [, month] = date.split('-');
      return parseInt(month, 10) - 1;
    }
    return new Date().getMonth();
  };

  const getDay = (date) => {
    if (date) {
      const [, , day] = date.split('-');
      return parseInt(day, 10);
    }
    return new Date().getDate();
  };

  const getHours = (time) => {
    if (time) {
      const [hours] = time.split(':');
      return parseInt(hours, 10);
    }
    return 0;
  };

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
        <TextField
          label="Título del evento"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ marginTop: '16px' }}
        />
        <TextField
          label="Fecha de inicio"
          type="date"
          value={startDate}
          onChange={handleStartDateChange}
        />
        <TextField
          label="Hora de inicio"
          type="time"
          value={startTime}
          onChange={handleStartTimeChange}
        />
        <TextField
          label="Fecha de finalización"
          type="date"
          value={endDate}
          onChange={handleEndDateChange}
        />
        <TextField
          label="Hora de finalización"
          type="time"
          value={endTime}
          onChange={handleEndTimeChange}
        />
        <Button variant="contained" type="submit">
          Agregar evento
        </Button>
      </Stack>
    </Box>
  );
};

export default EventCalendar;
