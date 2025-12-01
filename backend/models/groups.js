const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
  name: { type: String, required: true},
   members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users"   
    }
  ],
  joincode:{type:String,unique:true}
});

const Group = mongoose.model('Group', GroupSchema);

module.exports = Group;