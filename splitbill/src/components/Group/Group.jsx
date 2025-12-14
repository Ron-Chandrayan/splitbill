import React from 'react'
import { useOutletContext } from 'react-router-dom'
import {useState,useEffect} from 'react'
import toast from 'react-hot-toast'
import Expense from '../Expense/Expense'
import Settlement from '../Settlement/Settlement'
import History from '../History/History'

function Group() {

    const{joincode,username}=useOutletContext();
    const[name,setname]=useState("");
    const[members,setmembers]=useState([]);
    const[owes,setowes]=useState("");
    const[get,setget]=useState("");
    const[open,setopen]=useState(false);
    const[payload,setpayload]=useState({
      description:"",
      amount:"",
      even:true,
      paidby:"",
      splitbtn:[]
    })
    const[explist,setexplist]=useState([]);
    const[exp,setexp]=useState(true);
    const[settle,setsettle]=useState(false);




    const fetchgrpdeets=async()=>{
        const res = await fetch('http://localhost:5000/fetchdeets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({joincode:joincode, username:username}),  //{ } is used cuz it converts only string to objects
      });

      const data=await res.json();
      console.log(data);
      setname(data.message1);
      setmembers(data.message2);
      setowes(data.message3.owes);
      setget(data.message3.gets);

    }

    const fetchexp=async()=>{
       const res = await fetch('http://localhost:5000/fetchexpense', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({joincode:joincode}),  //{ } is used cuz it converts only string to objects
      });

      const data= await res.json();
      console.log(data.data);
      setexplist(data.data);
    }

      useEffect(() => {
      fetchgrpdeets(); 
      fetchexp();
    
      const interval = setInterval(() => {
        fetchgrpdeets();
        fetchexp();
      }, 1000); // 1 second
    
      return () => clearInterval(interval); // cleanup when component unmounts
    }, []);

                      const handleChange = (e) => {
                  const { name, value, checked } = e.target;

                  // ---------------------------------------------------
                  // 1️⃣ CHECKBOX → add/remove member in splitbtn
                  // ---------------------------------------------------
                  if (name === "splitbtn") {
                    const member = members.find((m) => m._id === value);

                    if (checked) {
                      // Add member
                      setpayload(prev => ({
                        ...prev,
                        splitbtn: [
                          ...prev.splitbtn,
                          { _id: member._id, name: member.name, amt: 0 }
                        ]
                      }));
                    } else {
                      // Remove member
                      setpayload(prev => ({
                        ...prev,
                        splitbtn: prev.splitbtn.filter((m) => m._id !== value)
                      }));
                    }

                    return;
                  }

                  // ---------------------------------------------------
                  // 2️⃣ AMOUNT INPUT → update amt of selected member
                  // ---------------------------------------------------
                  if (name.startsWith("amt-")) {
                    const id = name.replace("amt-", "");

                    setpayload(prev => ({
                      ...prev,
                      splitbtn: prev.splitbtn.map((m) =>
                        m._id === id ? { ...m, amt: Number(value) } : m
                      )
                    }));

                    return;
                  }

                  // ---------------------------------------------------
                  // 3️⃣ EVEN toggle checkbox
                  // ---------------------------------------------------
                  if (name === "even") {
                    setpayload(prev => ({
                      ...prev,
                      even: checked
                    }));
                    return;
                  }

                  // ---------------------------------------------------
                  // 4️⃣ DEFAULT updates
                  // ---------------------------------------------------
                  setpayload(prev => ({
                    ...prev,
                    [name]: value
                  }));
                };




    const handleSubmit=async(e)=>{
      e.preventDefault();
      console.log("your expense has been submitted");
     // console.log(payload);
      let sum=0
      payload.splitbtn.map((s)=>{
        sum=sum+s.amt
      })
      console.log(sum);

       const res = await fetch('http://localhost:5000/expense', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({...payload, joincode,username}),  //{ } is used cuz it converts only string to objects
      });

      const data = await res.json();
      console.log(data.data);

      if(data.success){
        toast.success("Expense created successfully!!");
      }else{
        toast.error(data.data);
      }



      setpayload({
        description:"",
      amount:"",
      even:true,
      paidby:"",
      splitbtn:[]
      })
    }

    useEffect(()=>{
        fetchgrpdeets();
    },[])

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{name}</h1>
              <p className="text-sm text-gray-500 font-mono bg-gray-100 inline-block px-3 py-1 rounded-full">
                Code: {joincode}
              </p>
            </div>
            <button 
              className='bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200' 
              onClick={()=>{
                setopen(true);
              }}
            >
              + Add Expense
            </button>
          </div>

          {/* Balance Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-5 border-l-4 border-red-500">
              <p className="text-sm text-red-700 font-medium mb-1">You Owe</p>
              <p className="text-3xl font-bold text-red-600">₹{owes}</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-5 border-l-4 border-green-500">
              <p className="text-sm text-green-700 font-medium mb-1">You Get</p>
              <p className="text-3xl font-bold text-green-600">₹{get}</p>
            </div>
          </div>
        </div>

        {/* Members Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <span className="bg-indigo-100 text-indigo-600 rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm font-bold">
              {members.length}
            </span>
            Group Members
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {members.map((member, index)=>(
              <div key={index} className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg px-4 py-3 border border-purple-200 hover:shadow-md transition-shadow duration-200">
                <p className="text-gray-700 font-medium">{member.name}</p>
              </div>
            ))}
          </div>
        </div>

         <div className="bg-white flex justify-around rounded-t-2xl shadow-lg p-8 border border-gray-100 mt-3">
          <div onClick={()=>{
            setexp(true);
          }} className='cursor-pointer' >Expenses</div>

          <div onClick={()=>{
            setsettle(true)
            setexp(false);
          }} className='cursor-pointer' >Settlements</div>

          <div onClick={()=>{
            setsettle(false)
            setexp(false);
          }} className='cursor-pointer' >History</div>
        </div>

        {exp?<Expense explist={explist} />:(settle?<Settlement/>:<History/>)}

        
         
       
      </div>

      

       {/* Modal */}
       {open && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 backdrop-blur-sm">
                <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200">
                  
                  {/* Modal Header */}
                  <div className="sticky top-0 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-6 rounded-t-2xl">
                    <h2 className="text-2xl font-bold">Add New Expense</h2>
                    <p className="text-indigo-100 text-sm mt-1">Fill in the details below</p>
                  </div>

                 <div className='flex flex-col px-8 py-6' >
                  <form onSubmit={handleSubmit}>

                    {/* Description */}
                    <div className="mb-6">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                      <input 
                        type='text'
                        placeholder='e.g., Dinner at restaurant'
                        name='description'
                        value={payload.description}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200"
                      />
                    </div>
                  
                    {/* Amount */}
                    <div className="mb-6">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Amount</label>
                      <input 
                        type='text'
                        placeholder='₹ 0.00'
                        name='amount'
                        value={payload.amount}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200"
                      />
                    </div>

                    {/* Paid By */}
                    <div className='mb-6'>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">Paid By</label>
                      <div className="space-y-2">
                        {members.map((member, index)=>(
                          <div key={index} className="flex items-center">
                            <label className="flex items-center cursor-pointer hover:bg-gray-50 px-3 py-2 rounded-lg w-full transition-colors duration-150">
                              <input 
                                type='radio' 
                                value={member._id} 
                                name='paidby' 
                                onChange={handleChange} 
                                checked={payload.paidby === member._id}
                                className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500 cursor-pointer"
                              />
                              <span className="ml-3 text-gray-700 font-medium">{member.name}</span>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Even/Uneven Split Toggle */}
                    <div className="mb-6 bg-amber-50 border border-amber-200 rounded-xl p-4">
                      <label className="flex items-center cursor-pointer">
                        <input 
                          type='checkbox' 
                          value={payload.even} 
                          name='even' 
                          checked={!payload.even} 
                          onChange={(e) => {
                            setpayload({
                                ...payload,
                                even: !e.target.checked
                              });
                          }}
                          className="w-5 h-5 text-amber-600 border-gray-300 rounded focus:ring-amber-500 cursor-pointer"
                        />
                        <span className="ml-3 text-gray-700 font-semibold">Enable Uneven Split</span>
                      </label>
                    </div>

                    {/* Split Among */}
                   <div className='mb-6'>
  <label className="block text-sm font-semibold text-gray-700 mb-3">Split Among</label>

                      <div className="space-y-3 bg-gray-50 rounded-xl p-4">
                        {members.map((member, index) => (
                          <div 
                            key={index} 
                            className="flex items-center gap-3 bg-white p-3 rounded-lg border border-gray-200 hover:border-indigo-300 transition-colors duration-150"
                          >
                            {/* Checkbox */}
                            <input
                              type="checkbox"
                              name="splitbtn"
                              value={member._id}
                              onChange={handleChange}
                              checked={payload.splitbtn.some(m => m._id === member._id)}
                              className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer"
                            />

                            <label className="flex-1 font-medium text-gray-700">
                              {member.name}
                            </label>

                            {/* Amount Input */}
                            <input
                              type="text"
                              name={`amt-${member._id}`}
                              value={payload.splitbtn.find(m => m._id === member._id)?.amt || ""}
                              placeholder="Amount"
                              disabled={!(!payload.even && payload.splitbtn.some(m => m._id === member._id))}
                              onChange={handleChange}
                              className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-all duration-200"
                            />
                          </div>
                        ))}
                      </div>
                    </div>


                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4 border-t border-gray-200">
                      <button 
                        type='submit'
                        className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200"
                      >
                        Submit Expense
                      </button>
                      <button 
                        type="button"
                        onClick={()=>{
                          setopen(false);
                        }}
                        className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-all duration-200"
                      >
                        Cancel
                      </button>
                    </div>
                 </form>
                 </div>
                 
                </div>
              </div>
            )}
    </div>
  )
}

export default Group