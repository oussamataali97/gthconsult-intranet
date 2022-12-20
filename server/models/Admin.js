const mongoose = require("mongoose");
const AdminSchema = new mongoose.Schema({


  email: {
    type: String,
    required: false,
    trim : true
  },
  
  password: {
    type: String,
    required: false,
    trim : true
  },

  nom: {
    type: String,
    required: false,
    trim : true
  },

  prenom: {
    type: String,
    required: false,
    trim : true
  },

  status: {
    type: String,
    required: false,
    trim : true
  },

  connected: {
    type: Boolean,
    required: false,
    default: false,
  },
  
  dateEmbauche: {
    type: String,
    required: false,
  },

  sousTraitanceId: {
    type: mongoose.Schema.Types.ObjectId, ref: 'SousTraitance',
    required: false,
  },
  
});

const Admin = mongoose.model("Admin", AdminSchema);
module.exports = Admin;