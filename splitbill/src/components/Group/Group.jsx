import React from 'react'
import { useOutletContext } from 'react-router-dom'
import {useState,useEffect} from 'react'

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
      even:false,
      paidby:"",
      splitbtn:[]
    })


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

        const handleChange = (e) => {
          const { name, value, checked } = e.target;

          // 1️⃣ ADD/REMOVE users when checkbox is clicked
          if (name === "splitbtn") {
            
            if (checked) {
              // Add new member with default amount 0
              setpayload({
                ...payload,
                splitbtn: [...payload.splitbtn, { name: value, amt: 0 }]
              });
            } else {
              // Remove member
              setpayload({
                ...payload,
                splitbtn: payload.splitbtn.filter((m) => m.name !== value)
              });
            }

            return;
          }

          // 2️⃣ UPDATE INDIVIDUAL MEMBER AMOUNT
          if (name.startsWith("amt-")) {
            const memberName = name.replace("amt-", "");

            setpayload({
              ...payload,
              splitbtn: payload.splitbtn.map((m) =>
                m.name === memberName ? { ...m, amt: Number(value) } : m
              )
            });

            return;
          }

          // 3️⃣ DEFAULT UPDATE (description, amount, paidby, even)
          if (name === "even") {
            setpayload({
              ...payload,
              even: checked
            });
          } else {
            setpayload({
              ...payload,
              [name]: value
            });
          }
        };



    const handleSubmit=async(e)=>{
      e.preventDefault();
      console.log("your expense has been submitted");
      console.log(payload);
      setpayload({
        description:"",
      amount:"",
      even:false,
      paidby:"",
      splitbtn:[]
      })
    }

    useEffect(()=>{
        fetchgrpdeets();
    },[])

  return (
    <div>
      <p>This is group page of {joincode} and group name is {name}</p>
      <p>You owe {owes} and get {get} </p>
      {members.map((member)=>(
        <p>{member.name}</p>
      ))}
      <button className='bg-blue-500 p-3 rounded-md m-4' onClick={()=>{
        setopen(true);
      }} >Add Expense</button>

       {open && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 backdrop-blur-sm">
                <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md animate-in fade-in zoom-in duration-200">

                 <div className='flex flex-col' >
                  <form onSubmit={handleSubmit}>

                    <div><input type='text'
                  placeholder='enter description'
                  name='description'
                  value={payload.description}
                  onChange={handleChange}
                  required
                   /></div>
                  
                  <div>
                     <input type='text'
                  placeholder='enter amount'
                  name='amount'
                  value={payload.amount}
                  onChange={handleChange}
                  required
                   />
                  </div>

                  <div className='flex flex-col'  >
                    <label >Paid By (Only one payer)</label>
                    {members.map((member)=>(
                      <div><label>
                        <input type='radio' value={member.name} name='paidby' onChange={handleChange} checked={payload.paidby === member.name}   />
                        {member.name} 
                      
                        </label></div>
                      
                    ))}
                  </div>

                  <div>
                    <label>
                      <input type='checkbox' value={payload.even} name='even' onChange={(e) => {
                        setpayload({
                            ...payload,
                            even: e.target.checked
                          });
                        }}/>
                    Click for Uneven Split
                    </label>
                    
                  </div>

                   <div className='flex flex-col'  >
                    <label >Split among</label>
                    {members.map((member)=>(
                      <div> <input 
                        type='checkbox'
                        name='splitbtn'
                        value={member.name}
                        onChange={handleChange}
                        checked={payload.splitbtn.some(m => m.name === member.name)}
                      />
                      <label>{member.name}</label>
                      <input 
                        type='text'
                        name={`amt-${member.name}`}   // UNIQUE NAME FOR AMOUNT INPUT
                        placeholder='enter amt'
                        disabled={!(payload.even && payload.splitbtn.some(m => m.name === member.name))}
                        onChange={handleChange}
                      />
                      </div>
                     
                    ))}
                  </div>
                 

                  <button type='submit'>Submit</button>
                  <button onClick={()=>{
                    setopen(false);
                  }}>Click to close </button>
                 </form>
                 </div>
                 
                </div>
              </div>
            )}
    </div>
  )
}

export default Group
