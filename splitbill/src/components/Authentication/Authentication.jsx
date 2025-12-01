import React from 'react'
import { useState,useEffect } from 'react';
import { useOutletContext,useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
function Authentication() {

    const { signup, setSignup,login,setlogin,setwelcome,setusername } = useOutletContext();
    const navigate=useNavigate()
    const [formData, setFormData] = useState({
    name:'',
    email:'',
    username:'',
    password:''
  });

  const handleChange=(e)=>{
    const {name,value}=e.target;
    setFormData((prev)=>({
        ...prev,
        [name]:value
    }))
  }

  const handleSubmit=async (e)=>{
    e.preventDefault()
    //navigate("/home");
    const payload={
        name: formData.name,
        email: formData.email,
        username:formData.username,
        password:formData.password
    }
    
    try {
        const res = await fetch('http://localhost:5000/authentication', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await  res.json();
      console.log(data);
      setFormData({
         name:'',
    email:'',
    username:'',
    password:''
    })

    if(data.success){
        console.log("welcome back");
        toast.success("Welcome!!");
        setSignup(false);
        setlogin(false);
        setwelcome(data.name);
        setusername(data.username);
        navigate("/home");
    }else{
        if(data.message==="password incorrect"){
            toast.error("Incorrect password");
        }else if(data.message==="username doesnt exists"){
             toast.error("Username doesnt exists!!");
        }
    }

    } catch (error) {
        
    }
    console.log("form submitted");
  }

  return (
    <div className='flex flex-column ' >
      <form onSubmit={handleSubmit}>

        {login?null:(<div className="m-3" ><input
         type="text"
        name="name"
         value={formData.name}
        onChange={handleChange}
        placeholder="Enter your name"
        required
        /></div>)}

        {login?null:(<div className="m-3" ><input
         type="email"
        name="email"
         value={formData.email}
        onChange={handleChange}
        placeholder="Enter your email"
        required
        /></div>)}

        <div className='m-3' > <input
         type="text"
        name="username"
         value={formData.username}
        onChange={handleChange}
        placeholder="Enter your username"
        required
        /></div>

        <div className='m-3' >
        <input type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Enter your password" 
        required/>
        </div>

        <p className='text-blue-500 cursor-pointer' onClick={()=>{
            setlogin(!login);
            setSignup(!signup);
        }} >{login?"Click here to signup":"Click here to login"}</p>

        <button type="submit" >{login?"Login":"Signup"}</button>
      
      </form>
    </div>
  )
}

export default Authentication
