const mongoose = require("mongoose");
const BonCommandeSchema = new mongoose.Schema({

    numeroBonCommande: {
        type: String,
        required: false
    },

    dateBonCommande: {
        type: Date,
        required: false
    },

    bonCommande : {
        type: String,
        required: false
    },

    date: {
        type: Date,
        default: Date.now
    },
    

});
const BonCommande = mongoose.model("BonCommande", BonCommandeSchema);
module.exports = BonCommande;