/**
 * Formato base para mostrar las actividades de horas beca que
 * pueden realizar los estudiantes. En si, es para presentar las actividades
 * creadas y a las que se pueden inscribir.
 */
import React, { useState } from 'react'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'

import PropTypes from 'prop-types'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Paper from '@mui/material/Paper'

import { supabase } from '@db-supabase/supabase.config'
import { useAuthContext } from '@contexts/AuthContext'
import styles from './ContenedorActividad.module.css'
import { hoverButtons, adminDetailsButton, hoverCancelButton } from './muiStyles'

function PaperComponent(props) {
  return (
    <Paper {...props} />
  )
}

export default function ContenedorActividad({
  actividad, onDelete, inscrito, onSuscribe, acreditada, onAcreditar,
  deSuscribed, onDeSuscribe,
}) {
  const [open, setOpen] = useState(false)
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false)
  const [openConfirmacionAcreditacion, setConfirmacionAcreditacion] = useState(false)
  const [openDesinscripcion, setDesincripcion] = useState(false)

  const [isInscrito, setIsInscrito] = useState(inscrito) // Estado para controlar si el usuario está inscrito
  const [estudiantesInscritos, setEstudiantesInscritos] = useState([])
  const [isAcreditada, setIsAcreditada] = useState(acreditada)
  const [isDeSuscribed, setIsDeSuscribed] = useState(deSuscribed)

  const combinedData = []

  const {
    authUser,
    setAuthUser,
    isLoggedIn,
    setIsLoggedIn,
  } = useAuthContext()

  // Abrir la ventana de detalles de la actividad
  const handleClickOpen = () => {
    setOpen(true)
  }

  // Cerrar la ventana de detalles de la actividad
  const handleClose = () => {
    setOpen(false)
  }

  /**
   * Dialogo de confirmacion
   */
  const handleQuitarClick = () => {
    setOpenConfirmationDialog(true)
  }

  const handleDialogOpen = () => {
    setOpenConfirmationDialog(true)
  }

  const handleDialogClose = () => {
    setOpenConfirmationDialog(false)
  }

  /**
   * Abrir la ventana de dialogo de la confirmacion
   * para la acreditacion de las horas.
   */
  const handleConfirmarAcreditacionOpen = () => {
    setConfirmacionAcreditacion(true)
  }

  /**
   * Cerrar la ventana de dialogo de la confirmacion para
   * la acreditacion de las horas.
   */
  const handleConfirmarAcreditacionClose = () => {
    setConfirmacionAcreditacion(false)
  }

  const handleOpenDesinscripcion = () => {
    setDesincripcion(true)
  }

  const handleCloseDesincripcion = () => {
    setDesincripcion(false)
  }
  /**
   * Eliminar una actividad. Esto solo es para los administradores.
   * En este caso, sirve para poder quitar de la pantalla, sin tener
   * que refrescar para poder ver el resultado de la eliminación.
   * @param {} e
   */
  const handleDelete = async (e) => {
    try {
      const { data, error } = await supabase
        .from('actividad_beca')
        .delete()
        .eq('id', actividad.id)

      if (error) {
        console.log('Failed fetching actividades beca data: ', error.message)
      } else {
        onDelete(actividad.id)
      }
    } catch (error) {
      console.log('Failed fetching actividades beca data: ', error.message)
    }
  }

  /**
   * Inscribirse a una actividad de horas beca. Esto es por parte de los estudiantes
   * @param {*} e
   */
  const handleInscripcion = async (e) => {
    try {
      const cuposDisponibles = actividad.cupos_disponibles
      // verificar si hay cupos disponibles
      if (cuposDisponibles > 0) {
        const { dataEstudiante, error } = await supabase
          .from('inscripcion_actividad')
          .insert([
            {
              actividad_id: actividad.id,
              acreditada: false,
              correo_estudiante: authUser.correo,
            },
          ])
          .select()
        // Llama a la función onSuscribe pasando la actividad para ocultarla
        onSuscribe(actividad.id)
        // Cambia el estado para indicar que el usuario está inscrito
        setIsInscrito(true)
        setIsAcreditada(false)
        // Actuazliar los cupos disponibles de la actividad cuando se haga la inscripcion
        const updateCupos = cuposDisponibles - 1
        const { actualizarActividad, errorActualizarActividad } = await supabase
          .from('actividad_beca')
          .update({ cupos_disponibles: updateCupos })
          .eq('id', actividad.id)
          .select()
      }
    } catch (error) {
      console.log('Error: ', error.message)
    }
  }

  /**
   * Des inscribirse de la actividad beca inscrita en la cual no desean participar.
   *
   * @param {*} e
   */
  const handleDesInscripcion = async (e) => {
    try {
      const { error } = await supabase
        .from('inscripcion_actividad')
        .delete()
        .eq('actividad_id', actividad.id)
        .eq('correo_estudiante', authUser.correo)

      const { data: actividadAtualizar, error: errorActividadActualizar } = await supabase
        .from('actividad_beca')
        .select('cupos_disponibles')
        .eq('id', actividad.id)

      const cuposActualizados = actividadAtualizar[0].cupos_disponibles + 1
      const { data: actividadBecaData, error: errorActividadBecaData } = await supabase
        .from('actividad_beca')
        .update({ cupos_disponibles: cuposActualizados })
        .eq('id', actividad.id)
        .select()

      setIsInscrito(false)
      onDeSuscribe(actividad.id)
    } catch (error) {
      console.log('Failed deleting de data: ', error)
    }
  }

  /**
   *
   * @param {*} e
   */
  const handleEliminarEstudianteInscrito = async (correoEstudiante) => {
    try {
      // Eliminar estudiante
      const { error: errorEliminarEstudiante } = await supabase
        .from('inscripcion_actividad')
        .delete()
        .eq('actividad_id', actividad.id)
        .eq('correo_estudiante', correoEstudiante)

      if (errorEliminarEstudiante) {
        console.log('Error al eliminar estudiante inscrito:', errorEliminarEstudiante)
        return
      }
      // Actualizar el estado local eliminando el estudiante de la lista
      setEstudiantesInscritos(
        (prevEstudiantes) => prevEstudiantes.filter(
          (estudiante) => estudiante.correo_estudiante !== correoEstudiante,
        ),
      )
    } catch (error) {
      console.error('Error al procesar la eliminación del estudiante:', error.message)
    }
  }

  /**
   * Acreditar las horas a los estudiantes, asi como, cambiar el estado de la
   * actividad, para no mostrarla, pues ya ha culminado la misma.
   */
  const handleAcreditarHoras = async () => {
    try {
      // Obtener los estudiantes inscritos
      await fetchEstudiantesInscritos()

      if (estudiantesInscritos.length === 0) {
        // Mostrar cuadro de diálogo indicando que no hay estudiantes inscritos
        alert('No hay estudiantes inscritos para acreditar horas.')
        return
      }
      // Cambiar el estado de la actividad inscrita
      const { acreditarHoras, errorAcreditarHoras } = await supabase
        .from('actividad_beca')
        .update({ acreditada: true, fecha: new Date(), habilitada: false })
        .eq('id', actividad.id)
        .select()

      // Cambiar el estado de la actividad inscrita
      const { inscripcionActividad, errorInscripcionActividad } = await supabase
        .from('inscripcion_actividad')
        .update({ acreditada: true })
        .eq('actividad_id', actividad.id)
        .select()

      const { data: dataActividad, error: errorDataActividad } = await supabase
        .from('actividad_beca')
        .select('*')
        .eq('id', actividad.id)

      if (dataActividad) {
        console.log('Actividades: ', dataActividad)
      } else {
        console.log('Failed fetching actividades beca data: ', errorDataActividad)
      }
      const correosEstudiantesInscritos = estudiantesInscritos.map((estudiante) => estudiante.correo_estudiante)
      // Obtener los estudiantes de la tabla becado para efectura la acreditacion
      const { data: dataEstudianteBecado, error: errorDataEstudianteBecado } = await supabase
        .from('becado')
        .select('*')
        .in('correo', correosEstudiantesInscritos)

      if (dataEstudianteBecado) {
        console.log('Estudiantes: ', dataEstudianteBecado)
      }

      // Realizar cálculos y actualizaciones en la tabla becado para cada estudiante
      dataEstudianteBecado.forEach(async (estudiante) => {
        // Encuentra la información de actividadesBeca correspondiente a esta actividad
        if (dataActividad) {
          // Calcula la suma de horas acreditadas y horas realizadas
          const horasAcreditadas = dataActividad[0].horas_acreditadas
          // console.log('Horas acreditadas: ', horasAcreditadas)
          const horasRealizadas = estudiante.horas_realizadas
          // console.log('Horas realizadas: ', horasRealizadas)
          const horasTotales = horasAcreditadas + horasRealizadas
          const horasRealizar = estudiante.horas_realizar
          let horasAcumuladas = estudiante.horas_acumuladas
          if (horasRealizar - horasTotales < 0) {
            horasAcumuladas += Math.abs(horasRealizar - horasTotales)
          }
          // console.log('Horas totales: ', horasTotales)
          // Actualiza la tabla becado con las horas totales
          await supabase
            .from('becado')
            .update({ horas_realizadas: horasTotales, horas_acumuladas: horasAcumuladas })
            .eq('id', estudiante.id)
            .select()
        }
      })

      /**
       * Actualizar el estado para indicar que el estudiante ya no está inscrito
       * Sirve para que no se muestre la actividad al estudiante.
       */
      onAcreditar(actividad.id)
      setIsInscrito(false)
      setIsAcreditada(true)
    } catch (error) {
      console.log('Error updating data: ', error)
    }
  }

  /**
   * Obtencion de los estudiantes que estan inscritos en la actividad en la
   * que se desea saber quienes se han inscrito
   */
  const fetchEstudiantesInscritos = async () => {
    try {
      const { data, error } = await supabase
        .from('inscripcion_actividad')
        .select('*')
        .eq('actividad_id', actividad.id)

      if (data) {
        setEstudiantesInscritos(data)
      } else {
        console.error('Error, no hay datos de los estudiantes inscritos:', error)
      }
    } catch (error) {
      console.error('Error al recuperar los datos de los estudiantes inscritos:', error.message)
    }
  }
  return (
    <div className={styles.container}>

      <h1 id="tituloActividad">{actividad.nombre_actividad}</h1>
      <p className={styles.activityDescriptionLabel}>Descripcion:</p>
      <p className={styles.scrollableText}>
        {actividad.descripcion}
      </p>
      <div className={styles.dataTitles}>
        <p className={styles.activityCuposLabel}>Cupos disponibles: </p>
        <p className={styles.activityHorasLabel}>Horas a acreditar</p>

      </div>
      <div className={styles.activityContainer}>
        <div className={styles.activityPair}>
          <div className={styles.activityCupos}>{actividad.cupos_disponibles}</div>
          <div className={styles.activityHoras}>{actividad.horas_acreditadas}</div>
        </div>

      </div>

      <div className={styles.buttons}>

        {authUser.type === true && (
          <>
            <Button
              sx={adminDetailsButton}
              onClick={() => {
                handleClickOpen()
                fetchEstudiantesInscritos()
              }}
            >
              Detalles
            </Button>
            {/* Obtener los detalles de los estudiantes que se han inscrito */}
            <Dialog
              open={open}
              onClose={handleClose}
              PaperComponent={PaperComponent}
              aria-labelledby="draggable-dialog-title"
            >
              <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                {actividad.nombre_actividad}
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  <div>
                    <strong>Estudiantes Inscritos:</strong>
                    <ul>
                      {estudiantesInscritos.map((estudiante) => (

                        <li key={estudiante.id} className={styles.listado}>
                          {estudiante.correo_estudiante}
                          <Button
                            variant="contained"
                            color="primary"
                            sx={{ marginLeft: '20px', ...hoverCancelButton }}
                            onClick={handleQuitarClick}
                          >
                            Quitar
                          </Button>
                          <Dialog
                            open={openConfirmationDialog}
                            onClose={handleDialogClose}
                            PaperComponent={PaperComponent}
                            aria-labelledby="draggable-dialog-title"
                          >
                            <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                              Confirmar eliminación
                            </DialogTitle>
                            <DialogContent>
                              <DialogContentText>
                                ¿Estás seguro de que deseas
                                quitar a este estuiante de la actividad?

                                ESTO SOLO DEBE HACERLO CUANDO HAYA CULMINADO LA ACTIVIDAD, Y QUE EL
                                ESTUDIANTE NO HAYA PARTICIPADO, AÚN HABIENDO ESTADO INSCRITO. ESTO SE
                                DEBE, PUES AL HACERLO SE PERDERA UN CUPO DE LA ACTIVIDAD.
                              </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                              <Button
                                sx={hoverButtons}
                                autoFocus
                                onClick={() => {
                                  handleDialogClose()
                                  handleEliminarEstudianteInscrito(estudiante.correo_estudiante)
                                }}
                              >
                                Confirmar
                              </Button>
                              <Button
                                sx={hoverCancelButton}
                                autoFocus
                                onClick={handleDialogClose}
                              >
                                Cancelar
                              </Button>
                            </DialogActions>
                          </Dialog>
                        </li>
                      ))}
                    </ul>
                  </div>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  sx={hoverButtons}
                  autoFocus
                  onClick={() => {
                    handleConfirmarAcreditacionOpen()
                  }}
                >
                  Acreditar a Todos
                </Button>
                <Dialog
                  open={openConfirmacionAcreditacion}
                  onClose={handleConfirmarAcreditacionClose}
                  PaperComponent={PaperComponent}
                  aria-labelledby="draggable-dialog-title"
                >
                  <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                    Confirmar acreditación
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      ¿Desea acreditar a todos los estudiantes inscritos
                      las horas de la actividad?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      sx={hoverButtons}
                      autoFocus
                      onClick={() => {
                        handleConfirmarAcreditacionClose()
                        handleClose()
                        handleAcreditarHoras()
                      }}
                    >
                      Confirmar
                    </Button>
                    <Button
                      sx={hoverCancelButton}
                      autoFocus
                      onClick={handleConfirmarAcreditacionClose}
                    >
                      Cancelar
                    </Button>
                  </DialogActions>
                </Dialog>
                {/*------*/}
                <Button
                  sx={hoverCancelButton}
                  autoFocus
                  onClick={handleClose}
                >
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>

            <Link to={`/actualizarActividad/${actividad.id}`}>
              <IconButton color="primary" size="large">
                <EditIcon />
              </IconButton>
            </Link>
            <IconButton
              color="secondary"
              size="large"
              onClick={(e) => handleDelete(e)}
            >
              <DeleteIcon />
            </IconButton>
          </>
        )}
        <div className={styles.buttonsStudent}>
          {authUser.type === false && !inscrito && (
            <>
              <Button
                variant="contained"
                color="primary"
                sx={{ ...hoverButtons }}
                onClick={(e) => handleInscripcion(e)}
              >
                Inscribirse
              </Button>

              <Button
                variant="contained"
                color="primary"
                sx={{ ...hoverButtons, marginLeft: '10px' }}
                onClick={handleClickOpen}
              >
                Detalles
              </Button>
              <Dialog
                open={open}
                onClose={handleClose}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
              >
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                  {actividad.nombre_actividad}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    <div>
                      <strong>Descripción:</strong>
                      <div className={styles.scrollableText}>
                        <p>
                          {actividad.descripcion}
                        </p>
                      </div>
                      <p>
                        <strong>Cupos Disponibles:</strong>
                        {' '}
                        {actividad.cupos_disponibles}
                      </p>
                      <p>
                        <strong>Horas Acreditadas:</strong>
                        {' '}
                        {actividad.horas_acreditadas}
                      </p>
                    </div>
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button autoFocus onClick={handleClose}>
                    Cancel
                  </Button>
                </DialogActions>
              </Dialog>

            </>
          )}
          {authUser.type === false && inscrito && (
            <>
              <Button
                variant="contained"
                color="primary"
                sx={{ ...hoverButtons, marginLeft: '10px' }}
                onClick={handleOpenDesinscripcion}
              >
                Des-inscribirse
              </Button>
              <Dialog
                open={openDesinscripcion}
                onClose={handleCloseDesincripcion}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
              >
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                  Confirmar Des inscricpción de actividad
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    ¿Deseas desinscribirte de la actividad?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    sx={hoverButtons}
                    autoFocus
                    onClick={() => {
                      handleDesInscripcion()
                      handleCloseDesincripcion()
                    }}
                  >
                    Confirmar
                  </Button>
                  <Button
                    sx={hoverCancelButton}
                    autoFocus
                    onClick={handleCloseDesincripcion}
                  >
                    Cancelar
                  </Button>
                </DialogActions>
              </Dialog>

              <Button
                variant="contained"
                color="primary"
                sx={{ ...hoverButtons, marginLeft: '10px' }}
                onClick={handleClickOpen}
              >
                Detalles
              </Button>
              <Dialog
                open={open}
                onClose={handleClose}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
              >
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                  {actividad.nombre_actividad}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    <div>
                      <strong>Descripción:</strong>
                      <div className={styles.scrollableText}>
                        <p>
                          {actividad.descripcion}
                        </p>
                      </div>
                      <p>
                        <strong>Cupos Disponibles:</strong>
                        {' '}
                        {actividad.cupos_disponibles}
                      </p>
                      <p>
                        <strong>Horas Acreditadas:</strong>
                        {' '}
                        {actividad.horas_acreditadas}
                      </p>
                    </div>
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button autoFocus onClick={handleClose}>
                    Cancel
                  </Button>
                </DialogActions>
              </Dialog>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

ContenedorActividad.propTypes = {
  actividad: PropTypes.shape({
    id: PropTypes.string.isRequired,
    nombre_actividad: PropTypes.string.isRequired,
    descripcion: PropTypes.string.isRequired,
    cupos_disponibles: PropTypes.number.isRequired,
    horas_acreditadas: PropTypes.number.isRequired,
    // Agrega otras propiedades según sea necesario
  }).isRequired,
  onDelete: PropTypes.func,
  inscrito: PropTypes.bool,
  onSuscribe: PropTypes.func,
  acreditada: PropTypes.bool,
  onAcreditar: PropTypes.func,
  deSuscribed: PropTypes.bool,
  onDeSuscribe: PropTypes.func,
}

ContenedorActividad.defaultProps = {
  onDelete: () => {},
  inscrito: false,
  onSuscribe: () => {},
  acreditada: false,
  onAcreditar: () => {},
  deSuscribed: false,
  onDeSuscribe: () => {},
}
