const mongoose = require('mongoose')
// const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')


const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: [true, "First Name Required"] },
    lastName: { type: String, required: [true, "Last Name Required"] },
    email: { type: String, unique: true, DropDups: true, required: [true, "Email is Required"], validate: { validator: val => /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$/.test(val), message: "Please enter a valid Email" } }, password: { type: String, required: [true, "Password is Required"], minLength: [8, "Password must be at least 8 characters"] }
}, { timestamps: true })


UserSchema.virtual('confirmPassword')
    .get(() => this._confirmPassword)
    .set(value => this._confirmPassword = value)


UserSchema.pre('validate', function (next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Password must match confirm password')
    }
    next()
})


UserSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash
            next()
        })
})


module.exports.User = mongoose.model('User', UserSchema)