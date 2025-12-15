import React from 'react'
import { useOutletContext,useNavigate } from 'react-router-dom'
import {useState, useEffect} from 'react'
import toast from 'react-hot-toast'
import { Plus, Users, Hash, UserPlus, X } from 'lucide-react'

function Home() {
    const {welcome,username,isauth,setjoincode} = useOutletContext();
    const[open,setopen]=useState(false);
    const[open2,setopen2]=useState(false);
    const[code,setcode]=useState("");
    const[ncode,setncode]=useState("");
    const[groups,setgroups]=useState([]);
    const[grpname,setgrpname]=useState("");

    const navigate = useNavigate();

   
    const handleClick=async(joincode)=>{
        //console.log(joincode);
        setjoincode(joincode);
        navigate('/group');
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        //console.log("you will be joined soon");
        //console.log(code);
        const payload={
            code:code,
            username:username
        }

         const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/joingroups`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),  
      });

      const data = await res.json();
     // //console.log(data);
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

    const handleSubmit2=async(e)=>{
        e.preventDefault();
        //console.log("group will be created soon");
        const payload={
            code:ncode,
            grpname:grpname,
            username:username
        }
        setgrpname("");
        //console.log(payload);
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/creategroups`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),  //{ } is used cuz it converts only string to objects
      });

      const data = await res.json();
      //console.log(data);
    }

    const fetchgroups=async()=>{
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/groups`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({username}),  //{ } is used cuz it converts only string to objects
      });

      const data= await res.json();
     //console.log(data.groups);
      setgroups(data.groups);
        } catch (error) {
            console.error(error);
        }
        
    }

            const generateCode =  (length = 6) => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars[Math.floor(Math.random() * chars.length)];
        }
        //console.log(result);
        setncode(result);
        };

        // const creategroup = async ()=>{
        //     const cud = generateCode();
            
        //     //console.log(cud);
            
        // }



    useEffect(() => {
  isauth(false);
  fetchgroups(); // call once immediately

  const interval = setInterval(() => {
    fetchgroups();
  }, 1000); // 1 second

  return () => clearInterval(interval); // cleanup when component unmounts
}, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-slate-900">Welcome back, <span className="text-blue-600">{welcome}</span></h1>
          <p className="text-slate-600 mt-1">Manage your groups and collaborations</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button 
            onClick={()=>{
              setopen2(!open2);
              generateCode();
            }}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            <Plus size={20} />
            Create New Group
          </button>

          <button 
            onClick={()=>{
              setopen(true);
            }}
            className="flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg border border-slate-200 transform hover:-translate-y-0.5"
          >
            <UserPlus size={20} />
            Join Group
          </button>
        </div>

        {/* Groups Section */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <Users size={24} className="text-blue-600" />
            Your Groups
          </h2>
          
          {groups.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {groups.map((group, index) => (
                <div 
                  key={index}
                  className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-5 border border-slate-200 hover:border-blue-300 transition-all duration-200 hover:shadow-md"
                >
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">{group.groupid.name}</h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Hash size={16} className="text-slate-400" />
                      <span className="font-mono bg-white px-2 py-1 rounded border border-slate-200">{group.groupid.joincode}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Users size={16} className="text-slate-400" />
                      <span>{group.groupid.members.length} member{group.groupid.members.length !== 1 ? 's' : ''}</span>
                    </div>
                    
                    <div className="text-sm text-slate-600">
                      <span className="font-medium">Balance:</span> <span className="text-slate-500"> {(group.gets) - (group.owes)}</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={()=>handleClick(group.groupid.joincode)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                  >
                    Enter Group
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Users size={48} className="text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 text-lg mb-2">No groups yet</p>
              <p className="text-slate-400 text-sm">Create a new group or join an existing one to get started</p>
            </div>
          )}
        </div>
      </div>

      {/* Create Group Modal */}
      {open2 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 backdrop-blur-sm">
          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md animate-in fade-in zoom-in duration-200">
            <button
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg p-2 transition-colors"
              onClick={() => {setopen2(false)}}
            >
              <X size={20} />
            </button>

            <div className="p-6">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Create New Group</h3>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-slate-600 mb-2 font-medium">Your Group Code</p>
                <p className="text-2xl font-mono font-bold text-blue-600 tracking-wider">{ncode}</p>
                <p className="text-xs text-slate-500 mt-2">Share this code with others to invite them</p>
              </div>

              <form className="space-y-4" onSubmit={handleSubmit2}>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Group Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Project Team"
                    value={grpname}
                    onChange={(e)=>{
                      setgrpname(e.target.value);
                    }}
                    className="w-full border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg px-4 py-3 outline-none transition-all"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
                >
                  Create Group
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Join Group Modal */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 backdrop-blur-sm">
          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md animate-in fade-in zoom-in duration-200">
            <button
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg p-2 transition-colors"
              onClick={() => setopen(false)}
            >
              <X size={20} />
            </button>

            <div className="p-6">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Join a Group</h3>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Group Code
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., ABC123"
                    value={code}
                    onChange={(e)=>{
                      setcode(e.target.value);
                    }}
                    className="w-full border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg px-4 py-3 outline-none transition-all font-mono uppercase"
                  />
                  <p className="text-xs text-slate-500 mt-2">Enter the 6-character code shared by the group admin</p>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
                >
                  Join Group
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home