import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import Dashboard from './components/Dashboard'
import Home from './components/Home'

function App() {
  return <>
   <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/sign-up' element={<SignUp />} />
      <Route path='/sign-in' element={<SignIn />} />
      <Route path='/dashboard' element={<Dashboard />} />
    </Routes>
   </BrowserRouter>
  </>
}

export default App
