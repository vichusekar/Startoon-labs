const express = require('express')
const { userModel } = require('../model/userModel')
const { hashPassword, comparePassword, createToken, decodeToken } = require('../authentication/auth')
const router = express.Router()

router.post('/sign-up', async (req, res) => {
    try {
        let user = await userModel.findOne({ email: req.body.email })
        if (!user) {
            req.body.password = await hashPassword(req.body.password)
            let newUser = await userModel.create(req.body)
            res.status(200).send({ message: "SignUp Successfully", newUser })
        }
        else {
            res.status(400).send({ message: `User with ${req.body.email} already exists` })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Internnal Server Error", error: error?.message })
    }
})

router.post('/sign-in', async (req, res) => {
    let loginCounts = 0;
    try {
        let oldUser = await userModel.findOne({ email: req.body.email })
        if (oldUser) {
            if (await comparePassword(req.body.password, oldUser.password)) {
                // if (loginCounts[oldUser]) {
                    let token = await createToken(oldUser)
                    // loginCounts[oldUser]++
                    res.status(200).send({ message: "Login Sucessfully", token })
                // }
                // else {
                //     loginCounts[oldUser] = 1
                // }

            }
            else {
                res.status(400).send({ message: "Invalid Credential" })
            }
        }
        else {
            res.status(404).send({ message: `User with ${req.body.email} doesn't exist` })
        }
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error", error: error?.message })
    }
})

router.get('/data', async (req,res) => {
    try {
        let details = await userModel.find({})
        if(details){
            res.status(200).send({message: "Data Fetched Successfully", details})
        }
        else{
            res.status(404).send({message: "Data not found"})
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({message: "Internal Server Error", error: error?.message})
    }
})

router.post('/admin' , async(req, res, next) => {
    try {
        let token = req?.headers?.authorization?.split(" ")[1]
        if(token){
            let {role} = await decodeToken(token)
            if(role == "admin"){
                next()
            }
            else{
                res.status(400).send({message: "Only Admin can access"})
            }
        }
    } catch (error) {
        res.status(500).send({message: "Internal Server Error"})
    }
})


module.exports = router