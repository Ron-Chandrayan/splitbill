import React from 'react'
import { useOutletContext } from 'react-router-dom'
import {useState,useEffect} from 'react'

function Group() {

    const{joincode}=useOutletContext();
    const[name,setname]=useState("");
    const[members,setmembers]=useState([]);

    const fetchgrpdeets=async()=>{
        const res = await fetch('http://localhost:5000/fetchdeets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({joincode}),  //{ } is used cuz it converts only string to objects
      });

      const data=await res.json();
      console.log(data);
      setname(data.message1);
      setmembers(data.message2);

    }

    useEffect(()=>{
        fetchgrpdeets();
    },[])

  return (
    <div>
      <p>This is group page of {joincode} and group name is {name}</p>
      {members.map((member)=>(
        <p>{member.name}</p>
      ))}
    </div>
  )
}

export default Group
