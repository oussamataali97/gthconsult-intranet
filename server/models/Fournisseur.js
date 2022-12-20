const mongoose = require("mongoose");
const FournisseurSchema = new mongoose.Schema({

    raisonSocial : {
        type: String,
        required: false
    },

    formJuridique : {
        type: String,
        required: false
    },

    ville : {
        type: String,
        required: false
    },

    codePostal : {
        type: String,
        required: false
    },

    pays : {
        type: String,
        required: false
    },

    email : {
        type: String,
        required: false
    },

    ice : {
        type: String,
        required: false
    },

    telephone : {
        type: String,
        required: false
    },

    activite : {
        type: String,
        required: false
    },

    date: {
        type: Date,
        default: Date.now
    }

});


const Fournisseur = mongoose.model("Fournisseur", FournisseurSchema);
module.exports = Fournisseur;