import React from 'react'
import { Route, 
BrowserRouter,
Routes } from 'react-router-dom'
import LogIn from '@pages/logIn'
import Home from '@pages/home'
import Calendario from '@components/calendario'
import Becarios from '@trabajador/registroBecarios'
import HistorialBeca from '@estudiante/historialBeca'
import ProtectedRoute from './protectedRoute/ProtectedRoute'
import NuevoEstudiante from '@trabajador/agregarEstudiante'
import ActividadBeca from '@pages/actividadesBeca'
import CrearActividad from '@trabajador/crearActividad'
import ActividadBecario from '@trabajador/actividadBecario'
import ActualizarActividad from '@trabajador/actualizarActividad'

export default function Routing(){

  return (
    <BrowserRouter>
    {/** El protected route es global, pues no se desea tener acceso, a menos que haya iniciado sesion */}
      <ProtectedRoute>
        <Routes>
          <Route path='/logIn' element={<LogIn/>}/>
          <Route
            exact
            path="/"
            element={(
                <Home />
            )}
          />
          {/* ESTE APARTADO ES PARA LOS ADMINISTRADORES Y LA NAVEGACION QUE POSEERAN */}
          {/** Pagina para mostrar todas las actividades beca vigentes */}
          <Route path='/actividadesBeca' element={(<ActividadBeca/>)}/>
          {/* Pagina para mostrar informacion de los estudiantes */}
          <Route path='/becarios' element={<Becarios/>}/>
          {/* Pagina para poder ingrear un nuevo estudiante al sistema */}
          <Route path='/NuevoEstudiante' element={<NuevoEstudiante/>}/>
          {/** Pagina como alternativa para ingresa manualmente los datos de la actividad beca */}
          <Route path='/actividadBecario' element={(<ActividadBecario/>)}/>  
          {/**Pagina para crear una actividad de horas beca */}
          <Route path='/nuevaActividad' element={<CrearActividad/>}/>
          <Route path='/actualizarActividad/:id' element={<ActualizarActividad/>}/>


          {/* ESTE APARTADO ES PARA LA NAVEGACION DE LO ESTUDIANTES */}
          {/* Pagina donde el estudiante ve como ha realizado sus horas de beca */}
          <Route path='/registroEstudiante' element={<HistorialBeca/>}/>
          
        </Routes>
      </ProtectedRoute>  
    </BrowserRouter>
  )
}