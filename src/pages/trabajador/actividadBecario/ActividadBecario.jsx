/**
 * Esta pagina funciona para ingresar la participacion de los estudiantes
 * en ciertas actividades de beca, de manera manual. Es decir, ingresar el nombre
 * del estudiante, la actividad a la que participo y las horas que se le acreditaran.
 */
/**
 * Esta página funciona para ingresar la participación de los estudiantes
 * en ciertas actividades de beca, de manera manual. Es decir, ingresar el nombre
 * del estudiante, la actividad a la que participó y las horas que se le acreditarán.
 */
import React, { useState } from 'react';
import { Grid, Box, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@db-supabase/supabase.config';
import SideBar from '@components/sideBar';
import { textFieldStyles, hoverButtons } from './muiStyles';
import styles from './ActividadBecario.module.css';

export default function ActividadBecario() {
  const [nombreActividad, setNombreActividad] = useState('');
  const [horasAcreditar, setHorasAcreditar] = useState('');
  const [correoEstudiante, setCorreoEstudiante] = useState('');

  const [nombreActividadValidation, setNombreActividadValidation] = useState(false);
  const [horasAcreditarValidation, setHorasAcreditarValidation] = useState(false);
  const [correoEstudianteValidation, setCorreoEstudianteValidation] = useState(false);

  const [nombreActividadErrorMessage, setNombreActividadErrorMessage] = useState('');
  const [horasAcreditarErrorMessage, setHorasAcreditarErrorMessage] = useState('');
  const [correoEstudianteErrorMessage, setCorreoEstudianteErrorMessage] = useState('');

  const navigate = useNavigate();

  /**
   * Validación de los campos, que no estén vacíos.
   */
  const validacionCampos = () => {
    let isValid = true;

    // Nombre de la actividad
    if (!nombreActividad) {
      setNombreActividadValidation(true);
      setNombreActividadErrorMessage('Debe ingresar el nombre de la actividad');
      isValid = false;
    } else {
      setNombreActividadValidation(false);
      setNombreActividadErrorMessage('');
    }
    // Cantidad de horas beca
    if (!horasAcreditar) {
      setHorasAcreditarValidation(true);
      setHorasAcreditarErrorMessage('Debe ingresar las horas que se acreditarán para la actividad');
      isValid = false;
    } else {
      setHorasAcreditarValidation(false);
      setHorasAcreditarErrorMessage('');
    }
    // Correo del estudiante
    if (!correoEstudiante) {
      setCorreoEstudianteValidation(true);
      setCorreoEstudianteErrorMessage('Debe ingresar el correo del estudiante para acreditarle las horas');
      isValid = false;
    } else {
      setCorreoEstudianteValidation(false);
      setCorreoEstudianteErrorMessage('');
    }

    return isValid;
  };

  const handleValidarActividad = async (e) => {
    e.preventDefault();
    try {
      if (!validacionCampos()) {
        return;
      } else {
        // Agregar un nuevo registro en la tabla 'validacion_manuela_actividad'
        const { dataInscripcion, errorInscripcion } = await supabase
          .from("validacion_manual_actividad")
          .insert([
            {
              nombre_actividad: nombreActividad,
              horas_acreditadas: horasAcreditar,
              correo_estudiante: correoEstudiante,
              fecha: new Date()
            },
          ])
        
        const { dataBecado, errorDataBecado } = await supabase
          .from("becado")
          .select("*")
          .eq("correo", correoEstudiante)
        
          console.log(dataBecado)
        }

    } catch (error) {
      console.log('Algo salió mal en la conexión:', error.message)
    }

    // Limpiar los campos después de la inserción
    /*
    setNombreActividad('')
    setHorasAcreditar('')
    setCorreoEstudiante('')
    */
  };

  return (
    <>
      <SideBar />
      <div className={styles.title}>
        <h1>DETALLES PARA LA ACTIVIDAD DE HORAS BECA</h1>
      </div>
      <div>
        <Box px={8} pb={8}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Nombre actividad"
                variant="outlined"
                fullWidth
                style={textFieldStyles}
                value={nombreActividad}
                onChange={(e) => setNombreActividad(e.target.value)}
                error={nombreActividadValidation}
                helperText={nombreActividadErrorMessage}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Correo Estudiante"
                variant="outlined"
                fullWidth
                style={textFieldStyles}
                value={correoEstudiante}
                onChange={(e) => setCorreoEstudiante(e.target.value)}
                error={correoEstudianteValidation}
                helperText={correoEstudianteErrorMessage}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Horas a Acreditar"
                variant="outlined"
                fullWidth
                type="number"
                value={horasAcreditar}
                style={textFieldStyles}
                onChange={(e) => setHorasAcreditar(e.target.value)}
                inputProps={{ min: '0' }}
                InputLabelProps={{
                  shrink: true,
                }}
                error={horasAcreditarValidation}
                helperText={horasAcreditarErrorMessage}
              />
            </Grid>
          </Grid>
        </Box>
        <Box display="flex" justifyContent="flex-end" paddingRight={8}>
          <Button
            size="medium"
            sx={{
              ...hoverButtons,
              fontSize: '13px',
              padding: '12px 24px',
              width: '260px',
            }}
            type="submit"
            variant="outlined"
            onClick={(e) => handleValidarActividad(e)}
          >
            Agregar
          </Button>
        </Box>
      </div>
    </>
  );
}
