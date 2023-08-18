import React, { useState, useEffect } from 'react';
import SideBar from '@components/sideBar';
import ContenedorActividad from '@components/formatoActividadBeca';
import Title from '@components/titles';
import encabezado from './encabezado';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@db-supabase/supabase.config';
import buttonStyle from './styleButton';
import styles from './ActividadBeca.module.css';

export default function ActividadBeca() {
  const [actividad, setActividad] = useState(null);
  const [filtroNombreActividad, setFiltroNombreActividad] = useState('');

  const navigate = useNavigate();

  const handleCreateActivity = () => {
    navigate('/detallesActividad');
  };

  const handleFiltrarActividad = (e) => {
    setFiltroNombreActividad(e.target.value);
  };

  useEffect(() => {
    const fetchActividad = async () => {
      try {
        const { data, error } = await supabase
          .from('actividad_beca')
          .select('*');

        if (error) {
          console.log('Error fetching data: ', error);
        } else {
          const filteredData = data.filter((detalles) =>
            detalles.nombre_actividad.toLowerCase().includes(filtroNombreActividad.toLowerCase())
          );

          // Establecer los datos filtrados en el estado 'actividad'
          setActividad(filteredData);
        }
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchActividad();
  }, [filtroNombreActividad]);

  return (
    <>
      <SideBar />
      <Title titles={encabezado} />
      <Button>Crear Actividad</Button>
      <TextField
        label="Filtrar por nombre"
        variant="outlined"
        onChange={(e) => handleFiltrarActividad(e)}
        sx={{ width: '200px' }}
      />
      <div className={styles.display}>
        {actividad !== null ? (
          actividad.map((detalles) => (
            <ContenedorActividad
              key={detalles.id}
              nombre_actividad={detalles.nombre_actividad}
              cupos_disponibles={detalles.cupos_disponibles}
              horas_acreditadas={detalles.horas_acreditadas}
              descripcion={detalles.descripcion}
            />
          ))
        ) : (
          <CircularProgress />
        )}
        <IconButton
          size="large"
          style={buttonStyle}
          color="primary"
          onClick={() => handleCreateActivity()}
        >
          <AddIcon style={{ fontSize: 'inherit' }} />
        </IconButton>
      </div>
      <div className={styles.finalBlock}></div>
    </>
  );
}
