const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors());

//connection to mongo

const MONGO_URI = "mongodb://localhost:27017/splitbill";

mongoose.connect(MONGO_URI).then
(() => console.log("✅ Connected to MongoDB"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

const users = require('./models/users');
const groups = require('./models/groups');

//basic get
app.get('/', (req,res)=>{
    res.send("alll good");
    })


//authentication
app.post('/authentication',async(req,res)=>{
    try {

         const{name,username,email,password}=req.body;
    console.log(name,username,email,password);
    if(name && email){
        const newUser = new users({name,username,email,password});
        await newUser.save();
        res.send({success:true ,message:"signup successful",name: name, username:username});
    }else{
        const cust = await users.findOne({username:username});
        if(cust){
            if(cust.password===password){
                //console.log("login successfull");
                res.send({success: true, message:"login successful", name:cust.name, username:cust.username})
            }else{
                //console.log("password wrong");
                res.send({success: false, message:"password incorrect"});
            }
        }else{
            //console.log("username doesnt exists");
            res.send({success: false, message:"username doesnt exists"});
        }

    }
        
    } catch (error) {
        console.error(error);
    }
   
    
})

//fetchgroup
app.post('/groups',async(req,res)=>{
    const {username} = req.body;
    //console.log(welcome);
      const metadata = await users.findOne({ username:username })
  .populate({
    path: "groups", // path = field in user schema
    populate: {
      path: "members", // field inside Group schema
      select: "name"
    }
  });
    //console.log(metadata.groups);
    res.send({success:true,groups:metadata.groups});
})

//join group
app.post('/joingroups',async(req,res)=>{
    try {

        const{code,username}=req.body;
    console.log(code,username);
    const codegrp = await groups.findOne({joincode:code});
    if(codegrp){
        const forid = await users.findOne({username:username});  //locates the user
        console.log(forid._id);
        //console.log("group exists");
        console.log(codegrp.members);

        if (codegrp.members.some(memberId => memberId.equals(forid._id))) { //duplicate entries
    return res.send({ success: false, message: "already" });
}

        (codegrp.members).push(forid._id); //appends the memebrs name in the group
        await codegrp.save();
        forid.groups.push(codegrp._id); //appends the group name in the members
        await forid.save();

        console.log(codegrp.members);

        res.send({success:true,message:"joined"});
       
    }else{
        console.log("group doesnt exists");
        res.send({success:false,message:"nogrp"});
    }
        
    } catch (error) {
        console.error(error);
        res.send({success:false,message:error.message});
    }
    
})

//create groups
app.post('/creategroups',async(req,res)=>{
    const{code,grpname,username}=req.body;
    console.log("code received",code);
   
    const forid=await users.findOne({username:username});
    console.log(forid._id);

    const newgrp= new groups({
        name:grpname,
        members:[forid._id],
        joincode:code
    })
    await newgrp.save();

    await users.findByIdAndUpdate(forid._id,
        {$push:{groups:newgrp._id}}
    )
    res.send({message:"group created "});
})

app.post(('/fetchdeets'),async(req,res)=>{
    const{joincode}=req.body;
    console.log(joincode);
    const grpdeets = await groups.findOne({joincode:joincode}).populate("members");
    console.log(grpdeets.members);
    res.send({message1:grpdeets.name ,message2:grpdeets.members});
})

// Start server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});