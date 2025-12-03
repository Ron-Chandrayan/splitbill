const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
  group:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group"   ,
    required: true
  },
  description:{type:String, required: true},

  amount:{type:Number, required:true},

  paidBy:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users" ,
    required: true
  },

  splitamg:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users" 
  }],

  date:{
    type: Date,  
    default:Date.now()
  }

});

const Expense = mongoose.model('Expense', ExpenseSchema);

module.exports = Expense;