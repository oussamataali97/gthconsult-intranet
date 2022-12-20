const mongoose = require("mongoose");
const ChargeSchema = new mongoose.Schema({

  article: {
    type: String,
    required: false,
  },

  categorie: {
    type: String,
    required: false,
  },

  dateEcheance: {
    type: String,
    required: false,
  },

  dateFacture: {
    type: String,
    required: false,
  },

  modePaiement: {
    type: String,
    required: false,
  },

  montantHT: {
    type: Number,
    required: false,
  },

  montantHTT: {
    type: Number,
    required: false,
  },

  nomFournisseur: {
    type: Array,
    required: false,
  },

  numeroFacture: {
    type: String,
    required: false,
  },

  paiement: {
    type: String,
    required: false,
  },

  tauxTVA: {
    type: Number,
    required: false,
  },

  type: {
    type: String,
    required: false,
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
    default: Date.now,
  }
  
});

const Charge = mongoose.model("Charge", ChargeSchema);
module.exports = Charge;