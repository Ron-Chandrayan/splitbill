import React from 'react'
import { useEffect, useState } from 'react';

function Settlement({joincode}) {

  const[settle,setsettle]=useState([]);

  const fetchsettlementdeeets=async()=>{
     const res = await fetch('http://localhost:5000/fetchsettlement', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({joincode:joincode}),
      });

      const data = await res.json();

      console.log(data.data);
      setsettle(data.data);
  }

  useEffect(()=>{
    fetchsettlementdeeets()
  },[])

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-purple-100">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Settlement History</h1>
            <p className="text-gray-500">Track all expense settlements and payments</p>
          </div>

          {settle.length > 0 ? (
            <div className="space-y-4">
              {settle.map((m, index) => (
                <div 
                  key={index}
                  className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-5 border border-purple-200 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 text-gray-700 mb-3">
                        <span className="font-semibold text-purple-700">{m.payer}</span>
                        <span className="text-gray-500">paid</span>
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full font-bold text-sm">
                          ₹{m.amt}
                        </span>
                        <span className="text-gray-500">to</span>
                        <span className="font-semibold text-indigo-700">{m.payee}</span>
                      </div>
                      <div className="bg-white px-4 py-2.5 rounded-lg border border-gray-200">
                        <div className="flex items-start gap-2">
                          <svg className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <div className="flex-1">
                            <span className="text-xs text-gray-500 uppercase tracking-wide font-medium">Expense Description</span>
                            <p className="text-base text-gray-800 font-medium mt-0.5">{m.expname}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-100 rounded-full mb-4">
                <svg className="w-10 h-10 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No settlements yet</h3>
              <p className="text-gray-500">Settlement transactions will appear here once expenses are settled</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Settlement;