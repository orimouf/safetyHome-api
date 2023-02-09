const router = require("express").Router()
const User = require("../models/User")
const CryptoJS = require("crypto-js")
const jwt = require("jsonwebtoken")
const verify = require("../verifyToken")


//REGISTER
router.post("/register", verify, async (req, res) => {

    const newUser = new User({
        fullName: req.body.fullName,
        // telegram: req.body.telegram,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(
            req.body.password,
            process.env.SECRET_KEY
            ).toString(),
        // binanceEmail: req.body.binanceEmail,
        // binanceHash: req.body.binanceHash,
        // capitalAmount: req.body.capitalAmount,
        country: req.body.country,
        isAdmin: req.body.isAdmin
    })

    try{
        const user = await newUser.save()
        res.status(201).json(user)
    } catch (err) {
        res.status(500).json(err)
    }
    
})

//LOGIN
router.post("/login", async (req, res) => {
    try{
        const user = await User.findOne({ fullName: req.body.fullName})
        !user && res.status(401).json("Wrong password or username!")
        !user.isAdmin && res.status(401).json("You are not admin !")

        const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY )
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8)

        originalPassword !== req.body.password &&
            res.status(401).json("Wrong password or username!")

        const accessToken = jwt.sign(
            {id: user._id, isAdmin: user.isAdmin},
            process.env.SECRET_KEY,
            {expiresIn: "5d"}
        )

        const { password, ...info } = user._doc

        res.status(200).json({...info, accessToken})
    } catch(err) {
        res.status(500).json(err)
    }
})

module.exports = router