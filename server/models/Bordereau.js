const mongoose = require("mongoose");
const BordereauSchema = new mongoose.Schema({

  numeroBD: {
    type: String,
    required: false,
  },

  refClient: {
    type: String,
    required: false,
  },

  numeroAffaire: {
    type: String,
    required: false,
  },

  missions: {
    type: Array,
    required: false,
  },

  dateEnvoi: {
    type: Date,
    required: false,
  },

  dateRecu: {
    type: Date,
    required: false,
  },

  raisonSocial: {
    type: String,
    required: false,
  },

  adresse: {
    type: String,
    required: false,
  },

  telephone: {
    type: String,
    required: false,
  },

  adresseEnvoi: {
    type: String,
    required: false,
  },

  numeroBC: {
    type: String,
    required: false,
  },
  
  numeroBE: {
    type: String,
    required: false,
  },

  numeroICE: {
    type: String,
    required: false,
  },


  dateCreation: {
    type: String,
    required: false,
  },

  affaireId :{
    type: mongoose.Schema.Types.ObjectId, ref: 'Affaire',
    required: false,
  }
  
});

const Bordereau = mongoose.model("Bordereau", BordereauSchema);
module.exports = Bordereau;