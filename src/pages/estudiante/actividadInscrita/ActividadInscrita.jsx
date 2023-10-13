import React, { useEffect, useState } from 'react'
import { CircularProgress, TextField, Button } from '@mui/material'
import { supabase } from '@db-supabase/supabase.config'
import { useAuthContext } from '@contexts/AuthContext'
import ContenedorActividad from '@components/formatoActividadBeca'
import SideBar from '@components/sideBar'
import styles from './ActividadInscrita.module.css'

export default function ActividadInscrita() {
  const [dataActividad, setDataActividad] = useState([]);
  const [filtroNombreActividad, setFiltroNombreActividad] = useState('');

  const { authUser } = useAuthContext();

  const handleFiltrarActividad = (e) => {
    setFiltroNombreActividad(e.target.value);
  }

  const handleDelete = (id) => {
    setDataActividad((prevDataActivity) => {
      return prevDataActivity.filter((dataActi) => dataActi.id !== id);
    });
  }

  useEffect(() => {
    const fetchActividad = async () => {
      try {
        const { data: inscripcionData, error: errorInscripcionData } = await supabase
          .from("inscripcion_actividad")
          .select('*')
          .eq("correo_estudiante", authUser.correo)
          .eq("acreditada", false)

        if (errorInscripcionData) {
          console.log("Error fetching inscripcionData: ", errorInscripcionData);
        } else {
          if (inscripcionData && inscripcionData.length > 0) {
            const actividadIds = inscripcionData.map((inscripcion) => inscripcion.actividad_id);

            const { data: actividadData, error: errorActividadData } = await supabase
              .from("actividad_beca")
              .select("*")
              .in("id", actividadIds);

            if (errorActividadData) {
              console.log("Error fetching actividadData: ", errorActividadData);
            } else {
              const filteredData = actividadData.filter((detalles) =>
                detalles.nombre_actividad.toLowerCase().includes(filtroNombreActividad.toLowerCase())
              );
              setDataActividad(filteredData);
            }
          } else {
            console.warn('No se encontraron registros en la tabla inscripcion_actividad para el usuario especificado.');
          }
        }
      } catch (e) {
        console.log("Error: ", e.message);
      }
    }
    fetchActividad();
  }, [filtroNombreActividad, authUser.correo])

  return (
    <>
      <SideBar />
      <div className={styles.buttonContainer}>
        <TextField
          label="Filtrar actividad por nombre"
          variant="outlined"
          onChange={(e) => handleFiltrarActividad(e)}
          sx={{ width: '200px' }}
          id="filtroActividadInscrita"
        />
      </div>
      <div className={styles.display}>
        {dataActividad !== null ? (
          dataActividad.map((detalles) => (
            <ContenedorActividad
              key={detalles.id}
              actividad={detalles}
              onDelete={handleDelete}
              inscrito={true}
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
