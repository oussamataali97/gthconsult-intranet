const mongoose = require("mongoose");
const AffaireSchema = new mongoose.Schema({

  numeroAffaire: {
    type: String,
    required: false
  },

  nameFileAffaire: {
    type: String,
    required: false
  },

  apporteurAffaire: {
    type: String,
    required: false
  },

  bonCommande: {
    type: String,
    required: false
  },

  numeroBonCommande: {
    type: String,
    required: false
  },

  renseignerIntervention : {
    type: String,
    default: false
  },
  
  be : {
    type: String,
    default: false
  },

  dateBE : {
    type: Date,
    default: ""
  },

  importRapport: {
    type: String,
    default: false
  },

  refRapport: {
    type: Array,
    default: false
  },

  sendRapport: {
    type: Array,
    default: false
  },

  dateSendRapport: {
    type: Date,
    default: ""
  },

  facture: {
    type: String,
    default: false
  },

  dateFacture: {
    type: Date,
    default: "",
  },

  Paiement: {
    type: String,
    default: false
  },

  clientId: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Client',
    required: false,
  },

  interlocuteurId: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Interlocuteur',
    required: false,
  },

  date: {
    type: Date,
    default: Date.now,
  },
  
  emise: {
    type: String,
    default: false
  }

});

const Affaire = mongoose.model("Affaire", AffaireSchema);
module.exports = Affaire;