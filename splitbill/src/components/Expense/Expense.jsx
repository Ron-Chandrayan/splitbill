import React from 'react'
import { useState } from 'react';
import {useNavigate } from 'react-router-dom'; 
import Payment from '../Payment/Payment';
import toast from 'react-hot-toast'

function Expense({explist,setexpid,setpaidid,username,paymentdone,setpaymentdone,setpaymentmode}) {

  const[open2,setopen2]=useState(false)
  const[gets,setgets]=useState("");
  const[owes,setowes]=useState([]);
  const[expname,setexpname]=useState("");
  const[gname,setgname]=useState("");
  const[itself,setitself]=useState(false);
  const[paydone,setpaydone]=useState(false);
  const navigate= useNavigate()

  if(paymentdone){
    toast.success("Payment Done !");
        setpaymentdone(false);
  }

    const handleSubmit=async(e,id)=>{
        e.preventDefault();
       // //console.log(id);

       setopen2(true);

        const res = await fetch('http://localhost:5000/expdeets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({id:id, username:username}),  //{ } is used cuz it converts only string to objects
      });

      const data = await res.json();
      //console.log(data);
      setgets(data.getsdeets);
      setowes(data.owesdeets);
      setexpname(data.exp);
      setgname(data.grp);
      setexpid(data.expid);
      setpaidid(data.paidid);
      setitself(data.sameacc);
      setpaydone(data.paydone);
    }

    const handleSubmit2=(e)=>{
      e.preventDefault();
      setpaymentmode(true);
      navigate('/payment');

    }


  return (
    <>
         <div className="bg-white rounded-b-2xl shadow-lg p-8 border border-gray-100 ">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <span className="bg-indigo-100 text-indigo-600 rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm font-bold">
              {explist.length}
            </span>
            Expenses
          </h2>
          
          {explist.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <p className="text-lg">No expenses added yet</p>
              <p className="text-sm mt-2">Add your first expense to get started</p>
            </div>
          ) : (
            <div className="space-y-3">
              {explist.map((exp, index) => (
                <div 
                  key={index} 
                  className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-4 border border-purple-200 hover:shadow-md hover:border-purple-300 transition-all duration-200"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="inline-block px-2 py-1 bg-indigo-600 text-white text-xs font-semibold rounded">
                          #{index + 1}
                        </span>
                        <h3 className="text-lg font-bold text-gray-800">{exp.description}</h3>
                      </div>
                      
                      <div className="space-y-1.5 text-sm">
                        <p className="text-gray-700">
                          <span className="font-semibold text-indigo-600">{exp.name}</span> paid{' '}
                          <span className="font-bold text-gray-900">₹{exp.paid}</span>
                        </p>
                        
                        <p className="text-gray-600 flex items-center gap-1">
                          <span className={`inline-block w-2 h-2 rounded-full ${exp.even ? 'bg-green-500' : 'bg-orange-500'}`}></span>
                          {exp.even 
                            ? `Split equally among ${exp.split} people` 
                            : `Split unequally among ${exp.split} people`
                          }
                        </p>
                      </div>
                    </div>

                    <div className='flex flex-col justify-center items-center'>{exp.even?(<div className="text-right ml-4">
                      <div className="text-xs text-gray-500 mb-1">Per person</div>
                      <div className="text-lg font-bold text-indigo-600">
                        ₹{(exp.paid / exp.split).toFixed(2)}
                      </div>
                    </div>):null}

                    <div><button onClick={(e)=>handleSubmit(e,exp.id)} className='bg-indigo-600 hover:bg-indigo-700 mt-1 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-2'>
                                    Details
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                    </svg>
                    </button></div>
                    </div>
                    
                    
                    
                    
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {open2 && (
  <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4 backdrop-blur-sm">
    <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md animate-in fade-in zoom-in duration-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-semibold text-lg">Group name: {gname}</h2>
          <button
            className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors duration-200 w-8 h-8 flex items-center justify-center"
            onClick={() => {
              setopen2(false);
            }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-gray-700 font-medium text-sm mb-4 uppercase tracking-wide">Expense name: {expname}</h3>
        
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {owes.map((m, index) => (
            <div 
              key={index}
              className="flex items-start gap-3 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-gray-800 text-sm leading-relaxed">
                  <span className="font-semibold text-gray-900">{m.name}</span> will pay ₹{" "}
                  <span className="font-bold text-blue-600">{m.amt}</span> to{" "}
                  <span className="font-semibold text-gray-900">{gets}</span>
                </p>
              </div>
            </div>
          ))}
          {!itself && !paydone && gets  && (
                <button onClick={handleSubmit2} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg">
                  Pay to {gets}
                </button>
              )}
        </div>
      </div>
    </div>
  </div>
)}
    </>
  )
}

export default Expense
