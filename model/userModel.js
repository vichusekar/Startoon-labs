const mongoose = require('mongoose')

function validateEmail(e){
    let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(e)
}

let userSchema = new mongoose.Schema({
    
    name: {type: String, required: true},

    email: {type: String, validate: {validator: validateEmail, message: "Enter valid email"}, required: true},

    password: {type: String, required: true, required: true},

    gender: {type: String, required: true}

}, {collection: "users", versionKey: false})

let userModel = mongoose.model("users", userSchema)

module.exports = {userModel}