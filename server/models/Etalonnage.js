const mongoose = require("mongoose");
const EtalonnageSchema = new mongoose.Schema({

designation: {
    type: String,
    required: false
},
  
marque: {
    type: String,
    required: true
},

identification: {
    type: String,
    required: true
},

etalonnieLe: {
    type: Date,
    required: true
},

prochaineEtalonnage: {
    type: Date,
    required: true
},

certificatsEtalonnage: {
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


const Etalonnage = mongoose.model("Etalonnage", EtalonnageSchema);
module.exports = Etalonnage;