import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import {authservice} from "./Appwrite/Auth"
import {login, logout} from "./store/authslice"
import Footer from './components/footer/Footer.jsx'
import Header from './components/Header/Header.jsx'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authservice.getaccount()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [])
  
  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
        TODO:  <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App