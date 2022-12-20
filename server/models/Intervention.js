const mongoose = require("mongoose");
const InterventionSchema = new mongoose.Schema({

  commentaire: {
    type: String,
    required: false,
  },

  deDate: {
    type: Date,
    required: false,
  },

  aDate: {
    type: Date,
    required: false,
  },

  nameInspecteur: {
    type: String,
    required: false,
  },

  chargeAffaire: {
    type: String,
    required: false,
  },

  missions: {
    type: Array,
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

  date :{
    type: Date,
    default: Date.now,
    required: false,
  },

  affaireId :{
    type: mongoose.Schema.Types.ObjectId, ref: 'Affaire',
    required: false,
  }
  
});

const Intervention = mongoose.model("Intervention", InterventionSchema);
module.exports = Intervention;