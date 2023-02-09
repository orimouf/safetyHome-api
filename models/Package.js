const mongoose = require("mongoose")

const PackageSchema = new mongoose.Schema(
    {
        investorId: { type: String, required: true, unique: true },
        PaymentMethod: { type: String, required: true },
        myWithdrawal: { type: Number, required: true },
        myWithdrawalAmount: { type: Number, required: true },
        currentYear: { type: Number, required: true },
        capitalLock: { type: Boolean, required: true },
        depositDate: { type: Date, required: true },
        startDate: { type: Date, required: true },
        nextProfitDate: { type: Date, required: true },
        capitalUnLockDate: { type: Date, required: true },
        profit: [
            {
            type: Object,
            default: {
              id: "",
              year: "",
              month: "",
              porcentage: 0,
              checkinSend: false
            }
          }]
    },
    { timestamps: true }
)

module.exports = mongoose.model("Package", PackageSchema)

// {
//     "_id":{"$oid":"63c1f4352587b71420fc897d"},
//     "name":"xzxzxz",
//     "array":[
//         {
//             "checkinSend":true,
//             "month":"naxjnasjx",
//             "porcentage":{"$numberInt":"12"}
//         }
//     ]
// }