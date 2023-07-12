import React, { useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/App.scss'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Header from './components/Header'
import Profile from './pages/Profile'
import { Toaster } from "react-hot-toast"
import axios from 'axios';
import { Context, server } from './main';

const App = () => {
  const { setUser, setisAuth, setLoader } = useContext(Context)

  useEffect(() => {
    setLoader(true);
    axios.get(`${server}/users/me`, {
      withCredentials: true
    }).then((res) => {
      setUser(res.data.user);
      setisAuth(true);
      setLoader(false);
    }).catch((error) => {
      setUser({});
      setisAuth(false);
      setLoader(false);
    })
  }, [])

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  )
}

export default App
