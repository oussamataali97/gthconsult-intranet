const mongoose = require("mongoose");
const ListdaySchema = new mongoose.Schema({

  number: {
    type: Number,
    required: false,
  },

  matricule: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Admin',
    required: false,
  },

  jour: {
    type: String,
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

  client: {
    type: String,
    required: false,
  },

  lieu: {
    type: String,
    required: false,
  },

  objet: {
    type: String,
    required: false,
  },

  gasoil: {
    type: Number,
    required: false,
  },

  autoroute: {
    type: Number,
    required: false,
  },

  taxi: {
    type: Number,
    required: false,
  },

  train: {
    type: Number,
    required: false,
  },

  hotel: {
    type: Number,
    required: false,
  },

  repas: {
    type: Number,
    required: false,
  },

  autre: {
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

  date: {
    type: Date,
    default: Date.now
  }


});

const Listday = mongoose.model("Listday", ListdaySchema);
module.exports = Listday;