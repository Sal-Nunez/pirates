const { User } = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")


module.exports.allUsers = (req, res) => {
    User.find()
        .then(allUsers => res.json(allUsers))
        .catch(err => res.json(err))
}

module.exports.editUser = (req, res) => {
    User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
        .then(user => res.json(user))
        .catch(err => res.status(400).json(err))
}

module.exports.deleteUser = (req, res) => {
    User.deleteOne({ _id: req.params.id })
        .catch(err => res.json(err))
        .then(user => res.json(user))
}

module.exports.register = (req, res) => {
    const user = User.findOne({email: req.body.email})
    .then(user => {
        if (user == null) {
            User.create(req.body)
                .then(user => {
                    const userToken = jwt.sign({id: user._id}, process.env.SECRET_KEY);
                    console.log(user)
                    res
                        .cookie("userToken", userToken, {httpOnly: true})
                        .json(user);
                })
                .catch(err => res.status(400).json(err))
        } else {
            res.json({ error: "Email already exists", status: 400 })
        }
    })
}

module.exports.login = async(req, res) => {
    console.log("Test")
    const user = await User.findOne({ email: req.body.email})
    if(user == null) return res.json({error: {email: "Email not found"}})
    const pw = await bcrypt.compare(req.body.password, user.password)
    if(!pw) return res.json({error: {password: "Password is Incorrect"}})
    const userToken = jwt.sign({id: user._id}, process.env.SECRET_KEY)
        res
            .cookie("userToken", userToken, {httpOnly: true})
            .json({ msg: 200})
}

module.exports.logout = (req, res) => {
    res.clearCookie('userToken');
    res.sendStatus(200);
}

module.exports.checkLogin = (req, res) => {
    res.json({ msg: 200})
}