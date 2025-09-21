const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    employeeId: { type: String, required: true },
    month: { type: String, required: true },
    description: { type: String, required: true },
    amount: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Expense", expenseSchema);
