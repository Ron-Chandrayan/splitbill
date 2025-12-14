const mongoose = require("mongoose");

const settlementEntrySchema = new mongoose.Schema(
  {
    owes: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    gets: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    }
  },
  { _id: false } // no extra _id for subdocs
);

const settlementSchema = new mongoose.Schema(
  {
    expense: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Expense",
      required: true,
      unique: true, // one settlement per expense
    },

    settlements: {
      type: [settlementEntrySchema],
      required: true,
      validate: v => v.length > 0
    },

    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
      required: true
    },

    createdAt: {
      type: Date,
      default: Date.now
    },
    paid:{
        type:Boolean,
        default:false
    }
  }
);

module.exports = mongoose.model("Settlement", settlementSchema);
