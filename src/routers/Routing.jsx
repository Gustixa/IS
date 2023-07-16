import { Route, 
BrowserRouter,
Routes } from 'react-router-dom'
import LogIn from '@pages/logIn'
import Home from '@pages/home'
import Calendario from '@components/calendario'
import Becarios from '@pages/registroBecarios'

export default function Routing(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/logIn' element={<LogIn/>}/>
        <Route exact path='/' element={<Home/>}/>
        <Route path='/actividadBeca' element={<Calendario/>}/>
        <Route path='/becarios' element={<Becarios/>}/>
      </Routes>
    </BrowserRouter>
  )
}