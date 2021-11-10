const mongoose = require('mongoose');


const PirateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "First Name Required, ARR"]
    },
    profilePic: {
        type: String,
        required: [true, "Picture Required, ARR"]
    },
    chests: {
        type: Number,
        required: [true, "How many chests u got? ARR"]},
    catchPhrase: {
        type: String,
        required: [true, "Catchphrase Required, ARR"]},
    position: {type: String, enum: ['Captain', 'First Mate', 'Quarter Master', 'Boatswain', 'Powder Monkey'], required: true},
    pegLeg: {type: Boolean, required: true},
    eyePatch: {type: Boolean, required: true},
    hookHand: {type: Boolean, required: true}
}, { timestamps: true });


module.exports.Pirate = mongoose.model('Pirate', PirateSchema);