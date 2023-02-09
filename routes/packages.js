const router = require("express").Router()
const Package = require("../models/Package")
const verify = require("../verifyToken")

// CREATE

router.post("/", verify, async (req, res) => {

    if(req.user.isAdmin) {
        const newPackage = new Package(req.body)
        try {
            const savedPackage = await newPackage.save()
            res.status(200).json(savedPackage)
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(500).json("you are not allowed!")
    }
})

//UPDATE

// router.put("/:id", verify, async (req, res) => {
//     if(req.user.isAdmin) {
//         try {
//             const updatedPackage = await Package.findByIdAndUpdate(
//                 req.params.id, 
//                 { $set: req.body },
//                 { new: true }
//             )
//             res.status(200).json(updatedPackage)
//         } catch (err) {
//             res.status(500).json(err)
//         }
//     } else {
//         res.status(500).json("you are not allowed!")
//     }
// })

//UPDATE // adds "GST"to all arrays if not exist

router.put("/addforall/:id", verify, async (req, res) => {
    if(req.user.isAdmin) {
        try {
            const updatedPackage = await Package.updateMany(
                { investorId: req.params.id },
                { $set: { "nextProfitDate": req.body.nextProfitDate},
                    $addToSet: { "profit": req.body.profit } },
            
            )
            res.status(200).json(updatedPackage)
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
            await Package.findByIdAndDelete(req.params.id)
            res.status(200).json("The Package has been deleted...")
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(500).json("you are not allowed!")
    }
})

//DELETE From Investors

router.delete("/investor/:investorid", verify, async (req, res) => {
    if(req.user.isAdmin) {
        try {
            await Package.deleteOne({ investorId: req.params.investorid })
            res.status(200).json("The Package has been deleted...")
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
        const package = await Package.findOne({ investorId: req.params.id })
        res.status(200).json(package)
    } catch (err) {
        res.status(500).json(err)
    }
})

//GET RANDOM

router.get("/random", verify, async (req, res) => {
    const type = req.query.type
    let package
    try {
        if (type === "promo") {
            package = await Package.aggregate([
              {$match: { isPromo: true} },
              { $sample: { size: 10 } },
          ])
        } else {
            package = await Package.aggregate([
                {$match: { isPromo: false} },
                { $sample: { size: 10 } },
            ])
        }
        res.status(200).json(package)
    } catch (err) {
        res.status(500).json(err)
    }
})

//GET ALL

router.get("/", verify, async (req, res) => {
    if(req.user.isAdmin) {
        try {
            const package = await Package.find()
            res.status(200).json(package)
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(500).json("you are not allowed!")
    }
})

module.exports = router