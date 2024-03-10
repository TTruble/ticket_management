import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react'
import Index from './mainpages/Index'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import EventInfo from './mainpages/EventInfo'
import Register from './mainpages/register'
import Login from './mainpages/login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
      
          <Routes>
      <Route index element={<Index />} />
      <Route path='/eventinfo/:id' element={<EventInfo />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />      
          </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
