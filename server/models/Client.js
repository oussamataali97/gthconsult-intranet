const mongoose = require("mongoose");
const ClientSchema = new mongoose.Schema({

  refClient: {
    type: String,
    required: false,
    unique : true
  },

  raisonSocial: {
    type: String,
    required: false,
    unique : true

  },

  adresse: {
    type: String,
    required: false
  },

  ville: {
    type: String,
    required: false,
    trim : true
  },

  codePostal: {
    type: String,
    required: false,
    trim : true
  },

  pays: {
    type: String,
    required: false,
    trim : true
  },

  email: {
    type: String,
    required: false,
    trim : true,
    unique : true
  },

  telephone: {
    type: String,
    required: false
  },

  date: {
    type: Date,
    default: Date.now
  },

  ice: {
    type: String,
    required: false
  }
  
});

const Client = mongoose.model("Client", ClientSchema);
module.exports = Client;