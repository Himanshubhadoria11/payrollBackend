const mongoose = require('mongoose')

const SalarySlipSchema = new mongoose.Schema({
  employeeId: {
    type: String,  // storing employee ID directly
    required: true,
  },
  month: {
    type: String,
    required: true,
  },
  basicPay: {
    type: Number,
    required: true,
  },
  allowances: {
    type: Number,
    default: 0,
  },
  deductions: {
    type: Number,
    default: 0,
  },
  netSalary: {   // ✅ match with frontend & error message
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('SalarySlip', SalarySlipSchema)
