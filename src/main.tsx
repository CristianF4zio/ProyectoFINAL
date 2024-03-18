import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import {  Route, BrowserRouter, Routes, Navigate } from 'react-router-dom'
import { loginURL, profileURL, registerURL } from './constants/url'
import { Login } from './Pages/Login/login'
import { Layout } from './Pages/layout'
import { Register } from './Pages/Register/register'
import { Profile } from './Pages/Profile/profile'
import { Home } from './Pages/Home/home'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <BrowserRouter>
        <Routes >
        <Route element = {<Layout />}>
        <Route path = {"/inicio"}element = {<Home />}></Route>
        <Route path = {loginURL} element = {<Login />} />
        <Route path={profileURL} element={<Profile/>}></Route>
        <Route path={registerURL} element={<Register/>}></Route>
        <Route path='/' element={<Navigate to="/inicio" />} /> {/* Redirige automáticamente a /home */}
        </Route>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
