const mongoose = require("mongoose")

const ProfitSchema = new mongoose.Schema(
    {
        weekStart: { type: Date, required: true, unique: true },
        weekEnd: { type: Date, required: true, unique: true },
        profitRatio: { type: Number, required: true },
        status: { type: String, default: "0" },   
    },
    { timestamps: true }
)

module.exports = mongoose.model("Profit", ProfitSchema)