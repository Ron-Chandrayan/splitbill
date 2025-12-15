import React from 'react'
import { useState,useEffect } from 'react';
import { useOutletContext,useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
function Authentication() {

    const { signup, setSignup,login,setlogin,setwelcome,setusername ,isauth} = useOutletContext();
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
  isauth(true);

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
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/authentication`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await  res.json();
      //console.log(data);
      setFormData({
         name:'',
    email:'',
    username:'',
    password:''
    })

    if(data.success){
        //console.log("welcome back");
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
    //console.log("form submitted");
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-4'>
      <div className='w-full max-w-md'>
        <div className='bg-white rounded-2xl shadow-2xl p-8 backdrop-blur-sm bg-opacity-95'>
          
          {/* Header */}
          <div className='text-center mb-8'>
            <h1 className='text-3xl font-bold text-gray-800 mb-2'>
              {login ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className='text-gray-500 text-sm'>
              {login ? 'Sign in to continue your journey' : 'Join us and get started today'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className='space-y-5'>

            {login ? null : (
              <div className='space-y-2'>
                <label className='text-sm font-medium text-gray-700 block'>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition duration-200 bg-gray-50 focus:bg-white'
                />
              </div>
            )}

            {login ? null : (
              <div className='space-y-2'>
                <label className='text-sm font-medium text-gray-700 block'>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition duration-200 bg-gray-50 focus:bg-white'
                />
              </div>
            )}

            <div className='space-y-2'>
              <label className='text-sm font-medium text-gray-700 block'>Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="username"
                required
                className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition duration-200 bg-gray-50 focus:bg-white'
              />
            </div>

            <div className='space-y-2'>
              <label className='text-sm font-medium text-gray-700 block'>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition duration-200 bg-gray-50 focus:bg-white'
              />
            </div>

            <button 
              type="submit" 
              className='w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transform hover:scale-[1.02] transition duration-200 shadow-lg hover:shadow-xl'
            >
              {login ? 'Sign In' : 'Create Account'}
            </button>

            <div className='relative my-6'>
              <div className='absolute inset-0 flex items-center'>
                <div className='w-full border-t border-gray-300'></div>
              </div>
              <div className='relative flex justify-center text-sm'>
                <span className='px-4 bg-white text-gray-500'>or</span>
              </div>
            </div>

            <p className='text-center text-sm text-gray-600'>
              {login ? "Don't have an account? " : "Already have an account? "}
              <span 
                className='text-indigo-600 font-semibold cursor-pointer hover:text-indigo-800 transition duration-200 hover:underline' 
                onClick={() => {
                  setlogin(!login);
                  setSignup(!signup);
                }}
              >
                {login ? 'Sign up' : 'Sign in'}
              </span>
            </p>
          </form>
        </div>

        {/* Footer text */}
        <p className='text-center text-xs text-gray-500 mt-6'>
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  )
}

export default Authentication