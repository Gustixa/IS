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
import ActividadBecario from '@estudiante/actividadesBeca'

export default function Routing(){

  return (
    <BrowserRouter>
        <Routes>
          <Route path='/logIn' element={<LogIn/>}/>
          {/** Se creo el protected route para no acceder a la pagina, hasta estar verificado */}
          <Route
            exact
            path="/home"
            element={(
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            )}
          />
          <Route path='/actividadBeca' element={<Calendario/>}/>
          <Route path='/home/becarios' element={<Becarios/>}/>

          <Route path='/home/registroEstudiante' element={<HistorialBeca/>}/>
          <Route path='/actividadBecario' element={<Calendario/>}/>
        </Routes>
      
    </BrowserRouter>
  )
}