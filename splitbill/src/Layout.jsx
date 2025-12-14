import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'


function Layout() {

    const[signup,setSignup]=useState(true);
    const[login,setlogin]=useState(false);
    const[welcome,setwelcome]=useState("");
    const[username,setusername]=useState("");
    const[auth,isauth]=useState(true);
    const[joincode,setjoincode]=useState("");
     const[expid,setexpid]=useState("");
      const[paidid,setpaidid]=useState("");


  return (
    <>
    {(auth)?null:<Header/>}
    <Outlet context={{signup,setSignup,login,setlogin,welcome,setwelcome,username,setusername,auth,isauth,joincode,setjoincode,expid,setexpid,paidid,setpaidid}} />
    {(auth)?null:<Footer/>}
    </>
  )
}

export default Layout
