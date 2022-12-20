const mongoose = require("mongoose");
const FicheTechniqueSchema = new mongoose.Schema({

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

numFiche: {
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


const FicheTechnique = mongoose.model("FicheTechnique", FicheTechniqueSchema);
module.exports = FicheTechnique;