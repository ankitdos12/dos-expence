const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, default: Date.now },
    paidTo: { type: String, required: true },
    amount: { type: Number, required: true },
    reason: { type: String },

    region: [{ type: String, required: true }],
    area: [{ type: String, required: true }],
    centre: [{ type: String, required: true }],
}, { timestamps: true });

module.exports = mongoose.model("Expense", expenseSchema);
