const mongoose = require("mongoose");
const FactureSchema = new mongoose.Schema({

  numeroFACTURE: {
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

  facturation: {
    type: Date,
    required: false,
  },

  echeance: {
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
  
  numeroFacture: {
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
  },

  tva :{
    type: Number,
    required: false,
  },

  prixTotalHT :{
    type: Number,
    required: false,
  },

  prixTotalTTC :{
    type: Number,
    required: false,
  },

  prixLettre :{
    type: String,
    required: false,
  },



  
});

const Facture = mongoose.model("Facture", FactureSchema);
module.exports = Facture;