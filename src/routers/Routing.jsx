import { Route, 
BrowserRouter,
Routes } from 'react-router-dom'
import LogIn from '@pages/logIn'
import Home from '@pages/home'
import Calendario from '@pages/calendario'

export default function Routing(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/logIn' element={<LogIn/>}/>
        <Route exact path='/' element={<Home/>}/>
        <Route path='/delva' element={<Calendario/>}/>
      </Routes>
    </BrowserRouter>
  )
}