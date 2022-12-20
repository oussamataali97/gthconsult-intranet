const mongoose = require("mongoose");
const InterlocuteurSousTraitanceSchema = new mongoose.Schema({

  nom: {
    type: String,
    required: false,
  },

  prenom: {
    type: String,
    required: false,
  },

  email: {
    type: String,
    required: false,
  },

  fonction: {
    type: String,
    required: false,
  },

  telephone: {
    type: String,
    required: false,
  },

  raisonSocial: {
    type: Array,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  }

});


const InterlocuteurSousTraitance = mongoose.model("InterlocuteurSousTraitance", InterlocuteurSousTraitanceSchema);
module.exports = InterlocuteurSousTraitance;