const router = require("express").Router()
const Profit = require("../models/Profit")
const verify = require("../verifyToken")

// CREATE

router.post("/", verify, async (req, res) => {

    if(req.user.isAdmin) {
        const newProfit = new Profit(req.body)
        try {
            const savedProfit = await newProfit.save()
            res.status(200).json(savedProfit)
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(500).json("you are not allowed!")
    }
})

//UPDATE

router.put("/:id", verify, async (req, res) => {
    if(req.user.isAdmin) {
        try {
            const updatedProfit = await Profit.findByIdAndUpdate(
                req.params.id, 
                { $set: { "status": req.body.status } },
                { new: true }
            )
            res.status(200).json(updatedProfit)
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(500).json("you are not allowed!")
    }
})

//UPDATE // adds "GST"to all arrays if not exist

// router.put("/addforall/:id", verify, async (req, res) => {
//     if(req.user.isAdmin) {
//         try {
//             const updatedProfit = await Profit.updateMany(
//                 { investorId: req.params.id },
//                 { $set: { "nextProfitDate": req.body.nextProfitDate},
//                     $addToSet: { "profit": req.body.profit } },
            
//             )
//             res.status(200).json(updatedProfit)
//         } catch (err) {
//             res.status(500).json(err)
//         }
//     } else {
//         res.status(500).json("you are not allowed!")
//     }
// })
 

//DELETE

router.delete("/:id", verify, async (req, res) => {
    if(req.user.isAdmin) {
        try {
            await Profit.findByIdAndDelete(req.params.id)
            res.status(200).json("The Item has been deleted...")
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(500).json("you are not allowed!")
    }
})

//GET

router.get("/find/:id", verify, async (req, res) => {
    try {
        const profit = await Profit.findOne({ investorId: req.params.id })
        res.status(200).json(profit)
    } catch (err) {
        res.status(500).json(err)
    }
})

//GET RANDOM

router.get("/random", verify, async (req, res) => {
    const type = req.query.type
    let profit
    try {
        if (type === "promo") {
            profit = await Profit.aggregate([
              {$match: { isPromo: true} },
              { $sample: { size: 10 } },
          ])
        } else {
            profit = await Profit.aggregate([
                {$match: { isPromo: false} },
                { $sample: { size: 10 } },
            ])
        }
        res.status(200).json(profit)
    } catch (err) {
        res.status(500).json(err)
    }
})

//GET ALL

router.get("/", verify, async (req, res) => {
    if(req.user.isAdmin) {
        try {
            const profit = await Profit.find()
            res.status(200).json(profit)
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(500).json("you are not allowed!")
    }
})

module.exports = router