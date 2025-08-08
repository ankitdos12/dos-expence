const Expense = require("../models/Expense");

const createExpense = async (req, res) => {
  try {
    const expense = new Expense(req.body);
    await expense.save();
    res.status(201).json(expense);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find().populate("user");
    res.status(200).json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getFilteredExpenses = async (req, res) => {
  try {
    const userExpenses = await Expense.find({ user: req.user.id }).populate("user");
    if(!userExpenses){
        return res.status(500).json({message:"No data fount."})
    }
    let { filter } = req.query;
    let startDate, endDate;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (filter === "yesterday") {
      startDate = new Date(today);
      startDate.setDate(today.getDate() - 1);
      endDate = new Date(today);
      endDate.setMilliseconds(-1); // End of yesterday
    } else if (filter === "7days") {
      startDate = new Date(today);
      startDate.setDate(today.getDate() - 6); // Includes today + previous 6 days
      endDate = new Date();
      endDate.setHours(23, 59, 59, 999);
    } else {
      // Default: today
      startDate = new Date(today);
      endDate = new Date();
      endDate.setHours(23, 59, 59, 999);
    }

    const expenses = await Expense.find({
      user: req.user._id, // Only logged-in user
      createdAt: { $gte: startDate, $lte: endDate },
    })
      .populate("user", "name role") // Only include specific fields if needed
      .populate("region")
      .populate("area")
      .populate("centre")
      .sort({ createdAt: -1 });

    res.status(200).json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getExpensesByUser = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id }).populate("user");
    res.status(200).json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createExpense,
  getExpenses,
  getFilteredExpenses,
  getExpensesByUser,
};
