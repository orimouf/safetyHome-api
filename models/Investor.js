const mongoose = require("mongoose")

const InvestorSchema = new mongoose.Schema(
    {
      fullName: { type: String, required: true, unique: true },
      telegram: { type: String, required: true, unique: true },
      binanceEmail: { type: String, unique: true },
      binanceHash: { type: String, unique: true },
      capitalAmount: { type: String, default: "" },
      profilePic: { type: String, default: "" },
      status: { type: String, default: "0" },
    },
    {timestamps: true}
)

module.exports = mongoose.model("Investor", InvestorSchema)