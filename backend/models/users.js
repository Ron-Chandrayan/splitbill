const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true},
  username: { type: String, required: true, unique: true},
  email: { type: String, required: true },
  password: { type: String, required: true },
   groups: [
    {groupid:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group"   
    },
    owes:{type:Number},
    gets:{type:Number}}
  ]
});

const Users = mongoose.model('Users', UserSchema);

module.exports = Users;