import React, { useState, useEffect } from 'react';
import SideBar from '@components/sideBar';
import ContenedorActividad from '@components/formatoActividadBeca';
import Title from '@components/titles';
import encabezado from './encabezado';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import hoverButtons from './muiStyles';
import styles from './ActividadBeca.module.css';
import { supabase } from '@db-supabase/supabase.config'

export default function ActividadBeca() {
  const [dataActividad, setDataActividad] = useState(null)
  const [filtroNombreActividad, setFiltroNombreActividad] = useState('');

  const navigate = useNavigate();

  /**
   * Metodo para hacer una acutlizacion autmatica de las actividades, en caso de eliminar
   * alguna
   * @param {*} id 
   */
  const handleDelete = (id) => {
    setDataActividad(prevDataActivity => {
      return prevDataActivity.filter(dataActi => dataActi.id !== id)
    })
  }
  const handleCreateActivity = () => {
    navigate('/nuevaActividad');
  };

  const handleFiltrarActividad = (e) => {
    setFiltroNombreActividad(e.target.value);
  };

  useEffect(() => {
    const fetchActividad = async () => {
      try {
        const { data, error } = await supabase
          .from('actividad_beca')
          .select('*')
          .order('id')

        if (error) {
          console.log('Error fetching data: ', error);
        } else {
          const filteredData = data.filter((detalles) =>
            detalles.nombre_actividad.toLowerCase().includes(filtroNombreActividad.toLowerCase())
          )

          // Establecer los datos filtrados en el estado 'actividad'
          setDataActividad(filteredData);
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
      <div className={styles.buttonContainer}>
        <TextField
          label="Filtrar por nombre"
          variant="outlined"
          onChange={(e) => handleFiltrarActividad(e)}
          sx={{ width: '200px' }}
        />
        <Button
          onClick={() => handleCreateActivity()}
          sx={hoverButtons}
          >
          Crear Actividad
        </Button>
      </div>
      
      <div className={styles.display}>
        {dataActividad !== null ? (
          dataActividad.map((detalles) => (
            <ContenedorActividad
              key={detalles.id}
              actividad={detalles}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <CircularProgress />
        )}
      </div>
      <div className={styles.finalBlock}></div>
    </>
  );
}
