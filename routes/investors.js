const router = require("express").Router()
const Investor = require("../models/Investor")
const verify = require("../verifyToken")

// CREATE

router.post("/", verify, async (req, res) => {
    if(req.user.isAdmin) {
        const newInvestor = new Investor(req.body)

        try {
            const savedInvestor = await newInvestor.save()
            res.status(200).json(savedInvestor)
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
            const updatedInvestor = await Investor.findByIdAndUpdate(
                req.params.id, 
                { $set: req.body },
                { new: true }
            )
            res.status(200).json(updatedInvestor)
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(500).json("you are not allowed!")
    }
})

//DELETE

router.delete("/:id", verify, async (req, res) => {
    if(req.user.isAdmin) {
        try {
            await Investor.findByIdAndDelete(req.params.id)
            res.status(200).json("The Investor has been deleted...")
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
        const investor = await Investor.findById(req.params.id)
        res.status(200).json(investor)
    } catch (err) {
        res.status(500).json(err)
    }
})

//GET RANDOM

router.get("/random", verify, async (req, res) => {
    const type = req.query.type
    let investor
    try {
        if (type === "promo") {
            investor = await Investor.aggregate([
              {$match: { isPromo: true} },
              { $sample: { size: 10 } },
          ])
        } else {
            investor = await Investor.aggregate([
                {$match: { isPromo: false} },
                { $sample: { size: 10 } },
            ])
        }
        res.status(200).json(investor)
    } catch (err) {
        res.status(500).json(err)
    }
})

//GET ALL

router.get("/", verify, async (req, res) => {
    if(req.user.isAdmin) {
        try {
            const investor = await Investor.find()
            res.status(200).json(investor)
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(500).json("you are not allowed!")
    }
})

module.exports = router