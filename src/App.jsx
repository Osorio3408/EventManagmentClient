import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SignIn } from './pages/SignIn';
import { Home } from './pages/Home';
import { CreateEvent } from './pages/CreateEvent';
import { ToastContainer } from 'react-toastify';
import { CreateGroup } from './pages/CreateGroup';
import 'react-toastify/dist/ReactToastify.css';
import { Groups } from './pages/Groups';
import { Users } from './pages/Users';
import { LostPassword } from './pages/LostPassword';
import { MyEvents } from './pages/MyEvents';

export const App = () => {
  return (
  <Router>
    <ToastContainer/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/MyEvents' element={<MyEvents/>}/>
      <Route path='/Pending' element={<Home/>}/>
      <Route path='/History' element={<Home/>}/>
      <Route path='/SignIn' element={<SignIn/>}/>
      <Route path='/NewEvent' element={<CreateEvent/>}/>
      <Route path='/NewGroup' element={<CreateGroup/>}/>
      <Route path='/Groups/:group' element={<Groups/>}/>
      <Route path='/MyGroups/:group' element={<Groups/>}/>
      <Route path='/Users' element={<Users/>}/>
      <Route path='/LostPassword' element={<LostPassword/>}/>
    </Routes>
  </Router>
  )
}
