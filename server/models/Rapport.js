const mongoose = require("mongoose");
var con = require("../dbsite");
const RapportSchema = new mongoose.Schema({

    referenceRapport : {
        type: String,
        required: false,
        unique  : true
    },

    designation: {
        type: String,
        required: false,
    },

    dateIntervention: {
        type: String,
        required: false,
    },

    responsableClient: {
        type: String,
        required: false,
    },

    dateProductionControle: {
        type: String,
        required: false,
    },

    date: {
        type: Date,
        default: new Date(),
        required: false,
    },

    originalname : {
        type: String,
        required: false,
        trim: true,
    },

    filename : {
        type: String,
        required: true,
        trim: true,
    },

    clientId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Client',
        required: true,
    },

    category : {
        type: String,
        required: false,
    },

    typeRapport : {
        type: String,
        required: false,
    },

    confirmation : {
        type : Number,
        required: true,

    },
    
    url : {
        type : String,
        required: true,
    },

    sendLocal : {
        type : Boolean,
        required: true,
        default: false
    },

    sendClient : {
        type : Boolean,
        required: true,
        default: false
    },

    numeroAffaire: {
        type: String,
        required: false
    },

    classOne: {
        type: String,
        required: false
    },

    classTow: {
        type: String,
        required: false
    },

    classTree: {
        type: String,
        required: false
    },

    classFour: {
        type: String,
        required: false
    },

    classFive: {
        type: String,
        required: false
    },

    disabled : {
        type : Boolean,
        required : true,
        default : false
    }

});


// const Rapport = mongoose.model("Rapport", RapportSchema);
const Rapport = con.myFirstDatabase.model("Rapport", RapportSchema);
module.exports = Rapport;