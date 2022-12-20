const mongoose = require("mongoose");
const SousTraitanceSchema = new mongoose.Schema({

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

    service : {
        type: String,
        required: false
    },

    date: {
        type: Date,
        default: Date.now
    }

});


const SousTraitance = mongoose.model("SousTraitance", SousTraitanceSchema);
module.exports = SousTraitance;