import React from 'react'
import { useOutletContext } from 'react-router-dom'
import {useState, useEffect} from 'react'
import toast from 'react-hot-toast'

function Home() {
    const {welcome,username} = useOutletContext();
    const[open,setopen]=useState(false);
    const[code,setcode]=useState("");
    const[groups,setgroups]=useState([]);

    const handleClick=async()=>{
        console.log("will navigate to a new page");
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        console.log("you will be joined soon");
        console.log(code);
        const payload={
            code:code,
            username:username
        }

         const res = await fetch('http://localhost:5000/joingroups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),  
      });

      const data = await res.json();
     // console.log(data);
      if(data.success){
        toast.success("group joined successfully");
      }else{
        if(data.message==="nogrp"){
            toast.error("code invalid");
        }else if(data.message==="already"){
            toast.error("you are already in the group");
        }else{
            toast.error("server issues");
        }
      }

    }

    const fetchgroups=async()=>{
        try {
            const res = await fetch('http://localhost:5000/groups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({username}),  //{ } is used cuz it converts only string to objects
      });

      const data= await res.json();
      console.log(data.groups);
      setgroups(data.groups);
        } catch (error) {
            console.error(error);
        }
        
    }

    useEffect(()=>{
         fetchgroups();
    },[] ) 

  return (
    <>
    <div>
      <p>This is the home page</p> 
      <p>welcome {welcome}</p>
    </div>

    <p>List of groups you are in</p>
    {groups.length>0?(groups.map((group)=>( //list of groups you are in
        <div className='bg-gray-500 m-2 rounded-md cursor-pointer' onClick={handleClick} >
            <p>{group.name}</p>
            <p>{group.joincode}</p>
            {(group.members).length>0?(group.members).map((person)=>(
                <p>{person.name}</p>
            )):<p>No members yet</p>}
        </div>
    ))):<p>You are not in any group</p>}

     <p className='cursor-pointer' onClick={()=>{
        setopen(true);
     }}>Click to Join a new group +</p>
     
     {open?(<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="relative bg-white p-6 w-96 h-96 flex flex-col">
  {/* Close button */}
  <button
                className="absolute top-2 right-2 hover:bg-gray-200"
                onClick={() => setopen(false)}
            >
                X
            </button>

            {/* Heading */}
            <h3 className="mb-4">Enter the Code</h3>

            {/* Form */}
            <form className="flex flex-col gap-2" onSubmit={handleSubmit} >
                <input
                type="text"
                placeholder="eg-rg203"
                value={code}
                onChange={(e)=>{
                    setcode(e.target.value);
                }}
                className="border p-2 rounded"
                />
                <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                Click
                </button>
            </form>
            </div>

     </div>):null}

    </>
  )
}

export default Home
