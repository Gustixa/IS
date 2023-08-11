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
          {/** se pude cambiar a actividad Beca */}
          <Route path='/delva' element={(<Calendario/>)}/>
          <Route path='/nuevaActividadBeca' element={(<ActividadBeca/>)}/>
          <Route path='/becarios' element={<Becarios/>}/>
          <Route path='/NuevoEstudiante' element={<NuevoEstudiante/>}/>
          <Route path='/registroEstudiante' element={<HistorialBeca/>}/>
          <Route path='/detallesActividad' element={<CrearActividad/>}/>
          {/** Se puede cambiar a actividadBecario */}
          <Route path='/delva' element={(<Calendario/>)}/>  
        </Routes>
      </ProtectedRoute>  
    </BrowserRouter>
  )
}