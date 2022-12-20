const mongoose = require("mongoose");
const FraisSchema = new mongoose.Schema({

  nom: {
    type: String,
    required: false,
  },

  prenom: {
    type: String,
    required: false,
  },

  matricule: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Admin',
    required: false,
  },

  mois: {
    type: Number,
    required: false,
  },

  annee: {
    type: Number,
    required: false,
  },
  
  listDays: {
    type: Array,
    required: false,
  },

  beneficiare: {
    type: String,
    required: false,
  },

  totalGeneral : {
    type: Number,
    required: false,
  },

  valideListDays : {
    type: Boolean,
    required: false,
  },

  valideRH : {
    type: Boolean,
    required: false,
  },

  valideDIR : {
    type: Boolean,
    required: false,
  },


  refTransaction : {
    type: String,
    required: false,
  },

  typePaiment : {
    type: String,
    required: false,
  },

  etatPaiment : {
    type: Boolean,
    required: false,
  },

  datePaiment : {
    type: Date,
    required: false,
  },

  validerDatePaiment : {
    type: Boolean,
    required: false,
  },

  notification : {
    type: Boolean,
    required: false,
    default : true,
  },

  date: {
    type: Date,
    default: Date.now
  }

});

const Frais = mongoose.model("Frais", FraisSchema);
module.exports = Frais;