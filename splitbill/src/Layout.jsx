import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

function Layout() {

    const[signup,setSignup]=useState(true);
    const[login,setlogin]=useState(false);
    const[welcome,setwelcome]=useState("");
    const[username,setusername]=useState("");

  return (
    <>
    {(signup!=login)?null:<Header/>}
    <Outlet context={{signup,setSignup,login,setlogin,welcome,setwelcome,username,setusername}} />
    {(signup!=login)?null:<Footer/>}
    </>
  )
}

export default Layout
