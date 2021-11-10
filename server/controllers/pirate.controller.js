const {Pirate} = require('../models/pirate.model')


module.exports.index = (req, res) => {
    res.json({message: 'Hello World'})
}

module.exports.allPirates = (req, res) => {
    Pirate.find()
        .then( Pirates => res.json(Pirates))
        .catch(err => res.json(err))
}

module.exports.createPirate = (req, res) => {
    // const { name, profilePic, chests, catchphrase } = req.body
    Pirate.create(req.body)
        .then(pirate => res.json(pirate))
        .catch(err => res.status(400).json(err))
}

module.exports.onePirate = (req, res) => {
    Pirate.findOne({_id: req.params.id})
        .then( pirate => {
            res.json(pirate)
        })
        .catch(err => res.json(err))
}

module.exports.editPirate = (req, res) => {
    Pirate.findOneAndUpdate({_id: req.params.id}, req.body, {new:true, runValidators: true})
        .then(pirate => res.json(pirate))
        .catch(err => res.status(400).json(err))
}

module.exports.deletePirate = (req, res) => {
    Pirate.deleteOne({_id: req.params.id})
    .catch(err => res.json(err))
    .then(pirate => res.json(pirate))
}