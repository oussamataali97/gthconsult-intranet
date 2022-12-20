const mongoose = require("mongoose");
const DepenceSchema = new mongoose.Schema({

dateFacture: {
    type: Date,
    required: false
},
  
montantHT: {
    type: Number,
    required: false
},

montantHTT: {
    type: Number,
    required: false
},

nomSociete: {
    type: Array,
    required: false
},

numeroFacture: {
    type: String,
    required: false
},

tauxTVA: {
    type: Number,
    required: false
},

type: {
    type: String,
    required: false
},

location: {
    type: String,
    required: false
},

originalname: {
    type: String,
    required: false
},

filename: {
    type: String,
    required: false
},

date: {
    type: Date,
    default: Date.now
}

});


const Depence = mongoose.model("Depence", DepenceSchema);
module.exports = Depence;