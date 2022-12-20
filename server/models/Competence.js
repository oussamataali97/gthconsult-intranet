const mongoose = require("mongoose");
const CompetenceSchema = new mongoose.Schema({

  nom: {
    type: String,
    required: false
  },

  prenom: {
    type: String,
    required: false
  },
  
  dateFormation: {
    type: Date,
    required: false
  },

  metier: {
    type: String,
    required: false
  },

  domaineFamille: {
    type: String,
    required: false
  },

  qualification: {
    type: String,
    required: true
  },

  connaissance: {
    type: String,
    required: false
  },

  moduleFormation: {
    type: String,
    required: false
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
  }
  
});


const Competence = mongoose.model("Competence", CompetenceSchema);
module.exports = Competence;