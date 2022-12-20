const mongoose = require("mongoose");
const CalendrierSchema = new mongoose.Schema({

  client: {
    type: String,
    required: false,
  },

  countInput: {
    type: Number,
    required: false,
  },

  disabled: {
    type: Boolean,
    required: false,
  },

  flagSauvgarder: {
    type: Number,
    required: false,
  },

  horaire: {
    type: Array,
    required: false,
  },

  inspecteur: {
    type: Array,
    required: false,
  },

  jour: {
    type: String,
    required: false,
  },

  lieu: {
    type: String,
    required: false,
  },

  number: {
    type: Number,
    required: false,
  },

  titre: {
    type: String,
    required: false,
  },

  valider: {
    type: Boolean,
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

  matricule: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Admin',
    required: false,
  },

  notification: {
    type: Boolean,
    required: true,
    default: true,
  },

  date: {
    type: Date,
    default: Date.now,
  }
  
});

const Calendrier = mongoose.model("Calendrier", CalendrierSchema);
module.exports = Calendrier;