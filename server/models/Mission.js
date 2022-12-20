const mongoose = require("mongoose");
const MissionSchema = new mongoose.Schema({

  typeMission: {
    type: String,
    required: false,
  },

  codeMission: {
    type: String,
    required: false,
  },

  equipement: {
    type: Array,
    required: false,
  },

  qte: {
    type: Array,
    required: false,
  },

  prix: {
    type: Number,
    required: false,
  },

  devis: {
    type: String,
    required: false,
  },

  interlocuteurId: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Interlocuteur',
    required: false,
  },

  clientId: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Client',
    required: false,
  },

  numeroAffaire :{
    type: String,
    required: false,
  },
  
  status: {
    type: String,
    required: false,
  },

  statusWithAffaire: {
    type: Boolean,
    required: false,
  },

  numRapport: {
    type: Array,
    required: false,
  },

  typeRapport : {
    type: String,
    required: false,
  },

  categorie : {
    type: String,
    required: false,
  }

});

const Mission = mongoose.model("Mission", MissionSchema);
module.exports = Mission;