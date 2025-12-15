const mongoose = require("mongoose");

const settlementSchema = new mongoose.Schema(
  {

    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
      required: true
    },
    expenseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Expense",
      required: true
    },

    fromUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true
    },


    amount: {
      type: Number,
      required: true,
      min: 0
    },


    paidAt: {
      type: Date
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Settlement", settlementSchema);
