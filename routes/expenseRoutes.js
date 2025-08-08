
const express = require("express");
const router = express.Router();
const {
    createExpense,
    getExpenses,
    getFilteredExpenses,
    getExpensesByUser
} = require("../controllers/expenseController");

const { authMiddleware } = require("../midleware/authMiddleware");

router.post("/", authMiddleware, createExpense);
router.get("/", authMiddleware, getExpenses);
router.get("/:userId", authMiddleware, getFilteredExpenses);
router.get("/my/:userId", authMiddleware, getExpensesByUser);



module.exports = router;
