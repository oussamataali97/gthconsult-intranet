const mongoose = require("mongoose");
const PaiementSchema = new mongoose.Schema({

  affaireId: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Affaire',
    required: false,
  },

  nameFilePaiement: {
    type: String,
    required: false
  },

  typePaiement: {
    type: String,
    required: false,
  },

  refTransaction: {
    type: String,
    required: false,
  },

  date: {
    type: Date,
    default: Date.now
  }

});

const Paiement = mongoose.model("Paiement", PaiementSchema);
module.exports = Paiement;