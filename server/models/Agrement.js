const mongoose = require("mongoose");
const AgrementSchema = new mongoose.Schema({

dateArgument: {
    type: Date,
    required: false
},
  
dateExpiration: {
    type: Date,
    required: true
},

dateRenouvellement: {
    type: Date,
    required: true
},

duree: {
    type: String,
    required: true
},

nomArgument: {
    type: String,
    required: true
},

nomMinistre: {
    type: String,
    required: true
},

preuve: {
    type: String,
    required: true
},

status: {
    type: String,
    required: true
},

location: {
    type: String,
    required: true
},
originalname: {
    type: String,
    required: true
},

filename: {
    type: String,
    required: true
},

date: {
    type: Date,
    default: Date.now
}

});


const Agrement = mongoose.model("Agrement", AgrementSchema);
module.exports = Agrement;