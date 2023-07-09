import { Route, 
BrowserRouter,
Routes } from 'react-router-dom'
import LogIn from '@pages/logIn'
import Home from '@pages/home'


export default function Routing(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/logIn' element={<LogIn/>}/>
        <Route exact path='/' element={<Home/>}/>
        
      </Routes>
    </BrowserRouter>
  )
}