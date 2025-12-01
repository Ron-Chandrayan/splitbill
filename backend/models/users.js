const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true},
  username: { type: String, required: true, unique: true},
  email: { type: String, required: true },
  password: { type: String, required: true },
   groups: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group"   
    }
  ]
});

const Users = mongoose.model('Users', UserSchema);

module.exports = Users;