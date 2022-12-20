const mongoose = require("mongoose");
const AgendaSchema = new mongoose.Schema({

  number: {
    type: Number,
    required: true
  },

  mois: {
    type: Number,
    required: true
  },

  annee: {
    type: Number,
    required: true
  },

  listCalendrier: {
    type: Array,
    required: true
  },

  date: {
    type: Date,
    default: Date.now
  }
  
});
const Agenda = mongoose.model("Agenda", AgendaSchema);
module.exports = Agenda;