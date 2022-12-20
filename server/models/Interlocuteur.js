const mongoose = require("mongoose");
var con = require("../dbsite");
const InterlocuteurSchema = new mongoose.Schema({

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

  password: {
    type: String,
    required: true,
  },

  pass: {
    type: String,
    required: true,
  },

  fonction: {
    type: String,
    required: false,
  },

  telephone: {
    type: String,
    required: false,
  },

  status: {
    type: Boolean,
    required: false,
    default: false,
  },

  send: {
    type: Boolean,
    required: false,
    default: false,
  },

  date: {
    type: Date,
    default: Date.now,
  },

  clientId: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Client',
    required: true,
  },

  interlocuteurs: {
    type: Array,
    required: false,
  }

  
});

const Interlocuteur = con.myFirstDatabase.model("Interlocuteur", InterlocuteurSchema);
// const Interlocuteur = mongoose.model("Interlocuteur", InterlocuteurSchema);
module.exports = Interlocuteur;