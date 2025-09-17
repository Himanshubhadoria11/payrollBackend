// const Expense = require("../models/Expense");

// // Add new expense
// exports.addExpense = async (req, res) => {
//   try {
//     const { employeeId, month, description, amount } = req.body;
//     const expense = await Expense.create({ employeeId, month, description, amount });
//     res.status(201).json(expense);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

// // Get expenses for logged-in employee
// exports.getExpenses = async (req, res) => {
//   try {
//     const expenses = await Expense.find({ employeeId: req.userdata._id });
//     res.json(expenses);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

const Expense = require("../models/Expense");

// Add new expense
exports.addExpense = async (req, res) => {
  try {
    const { month, description, amount } = req.body;

    const expense = await Expense.create({
      employeeId: req.userdata._id, // use logged-in user ID
      month,
      description,
      amount,
    });

    res.status(201).json({ message: "Expense added successfully", expense });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get expenses for logged-in employee
exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ employeeId: req.userdata._id }).sort({ createdAt: -1 });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
