

const SalarySlip = require("../models/SalarySlip");

// Get all salary slips
const getSalarySlips = async (req, res) => {
  try {
    const slips = await SalarySlip.find();
    res.json(slips);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create new salary slip
const createSalarySlip = async (req, res) => {
  try {
    const { employeeId, month, basicPay, allowances, deductions } = req.body;

    const netSalary =
      Number(basicPay) + (Number(allowances) || 0) - (Number(deductions) || 0);

    const slip = new SalarySlip({
      employeeId,
      month,
      basicPay,
      allowances,
      deductions,
      netSalary,
    });

    await slip.save();
    res.status(201).json(slip);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update salary slip
const updateSalarySlip = async (req, res) => {
  try {
    const { basicPay, allowances, deductions } = req.body;

    const netSalary =
      (basicPay ? Number(basicPay) : 0) +
      (allowances ? Number(allowances) : 0) -
      (deductions ? Number(deductions) : 0);

    const updatedSlip = await SalarySlip.findByIdAndUpdate(
      req.params.id,
      { ...req.body, netSalary },
      { new: true }
    );

    if (!updatedSlip) return res.status(404).json({ error: "Slip not found" });

    res.status(200).json(updatedSlip);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


// Delete salary slip
const deleteSalarySlip = async (req, res) => {
  try {
    const deleted = await SalarySlip.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Slip not found" });
    res.json({ message: "Salary slip deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  getSalarySlips,
  createSalarySlip,
  updateSalarySlip,
  deleteSalarySlip,
};
