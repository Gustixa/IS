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
import ActividadInscrita from '@estudiante/actividadInscrita'
import ActualizarEstudiante from '@trabajador/actualizarEstudiante'

export default function Routing(){

  return (
    <BrowserRouter>
    
    {/** El protected route es global, pues no se desea tener acceso, a menos que haya iniciado sesion */}
      
      <Routes>
        <Route path='/logIn' element={<LogIn/>}/>
            
        <Route
          exact
          path="/"
          element={(
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          )}
        />
        {/* ESTE APARTADO ES PARA LOS ADMINISTRADORES Y LA NAVEGACION QUE POSEERAN */}
        {/** Pagina para mostrar todas las actividades beca vigentes */}
        <Route path='/actividadesBeca' element={(
          <ProtectedRoute>
            <ActividadBeca/>
          </ProtectedRoute>
        )}/>
        {/* Pagina para mostrar informacion de los estudiantes */}
        <Route path='/becarios' element={
          <ProtectedRoute>
            <Becarios/>
          </ProtectedRoute>
        }/>
        {/* Pagina para poder ingrear un nuevo estudiante al sistema */}
        <Route path='/NuevoEstudiante' element={
          <ProtectedRoute>
            <NuevoEstudiante/>
          </ProtectedRoute>
        }/>
        {/** Pagina como alternativa para ingresa manualmente los datos de la actividad beca */}
        <Route path='/actividadBecario' element={(
          <ProtectedRoute>
            <ActividadBecario/>
          </ProtectedRoute>
        )}/>  
        {/**Pagina para crear una actividad de horas beca */}
        <Route path='/nuevaActividad' element={
          <ProtectedRoute>
            <CrearActividad/>
          </ProtectedRoute>
        
        }/>
        <Route path='/actualizarActividad/:id' element={
          <ProtectedRoute>
            <ActualizarActividad/>
          </ProtectedRoute>
        }/>
        <Route path='/actualizarEstudiante/:id' element={
          <ProtectedRoute>
            <ActualizarEstudiante/>
          </ProtectedRoute>
        }/>

        {/* ESTE APARTADO ES PARA LA NAVEGACION DE LO ESTUDIANTES */}
        {/* Pagina donde el estudiante ve como ha realizado sus horas de beca */}
        <Route path='/registroEstudiante' element={
          <ProtectedRoute>
            <HistorialBeca/>
          </ProtectedRoute>
        }/>
        {/* Pagina para ver las actividades en las que el estudiante se ha inscrito */}
        <Route path='/actividadesInscritas' element={
          <ProtectedRoute>
            <ActividadInscrita/>
          </ProtectedRoute>
        }/>
        
      </Routes>
    </BrowserRouter>
  )
}