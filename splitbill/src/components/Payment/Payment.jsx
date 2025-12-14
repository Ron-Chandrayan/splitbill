import React from 'react'
import { useOutletContext, useNavigate } from 'react-router-dom'; 
import { useEffect, useState } from 'react'

function Payment() {
  const {expid, paidid, username} = useOutletContext();
  const [payamt, setpayamt] = useState(0)
  const [payer, setpayer] = useState("")
  const [payingto, setpayingto] = useState("")
  const [expname, setexpname] = useState("")

  const fetchpaymentdeets = async() => {
    const res = await fetch('http://localhost:5000/fetchpaydeets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({expid:expid, paid:paidid, username:username}),
    });

    const data = await res.json();
    console.log(data);
    setpayer(data.payer)
    setpayingto(data.payingtoname)
    setpayamt(data.amt);
    setexpname(data.expname);
  }

  const handleSubmit = async() => {
    const res = await fetch('http://localhost:5000/payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({expid:expid, paid:paidid, username:username , amt:payamt}),
    });

    const data = await res.json();
    console.log(data);
  }

  useEffect(() => {
    fetchpaymentdeets();
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="bg-indigo-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Payment Details</h1>
          <p className="text-gray-500 text-sm">{expname}</p>
        </div>

        <div className="space-y-6 mb-8">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500 mb-1">From</p>
            <p className="text-lg font-semibold text-gray-800">{payer}</p>
          </div>

          <div className="flex justify-center">
            <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500 mb-1">To</p>
            <p className="text-lg font-semibold text-gray-800">{payingto}</p>
          </div>

          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-6 text-center">
            <p className="text-white text-sm mb-2 opacity-90">Amount</p>
            <p className="text-4xl font-bold text-white">₹{payamt.toFixed(2)}</p>
          </div>
        </div>

        <button 
          onClick={handleSubmit}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          Complete Payment
        </button>

        <p className="text-center text-xs text-gray-400 mt-6">
          Secure payment powered by your app
        </p>
      </div>
    </div>
  )
}

export default Payment