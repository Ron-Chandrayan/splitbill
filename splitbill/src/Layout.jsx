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
    const[paymentdone,setpaymentdone]=useState(false);
    const[paymentmode,setpaymentmode]=useState(false);


  return (
    <>
    {(auth)?null:<Header signup={signup} setSignup={setSignup} login={login} setlogin={setlogin} />}
    <Outlet context={{signup,setSignup,login,setlogin,welcome,setwelcome,username,setusername,auth,isauth,joincode,setjoincode,expid,setexpid,paidid,setpaidid,paymentdone,setpaymentdone,paymentmode,setpaymentmode}} />
    {(auth)?null:<Footer/>}
    </>
  )
}

export default Layout
