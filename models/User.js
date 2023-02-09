const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema(
    {
      fullName: { type: String, required: true, unique: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      country: { type: String, default: "" },
      profilePic: { type: String, default: "" },
      status: { type: String, default: "0" },
      isAdmin: { type: Boolean, default: false},
    },
    {timestamps: true}
)

module.exports = mongoose.model("User", UserSchema)