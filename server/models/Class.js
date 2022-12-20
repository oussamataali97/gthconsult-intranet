const mongoose = require("mongoose");
var con = require("../dbsite");
const ClassSchema = new mongoose.Schema({

numeroAffaire: {
    type: String,
    required: false
},
  
classOne: {
    type: Array,
    required: true
},

classTow: {
    type: Array,
    required: true
},

classTree: {
    type: Array,
    required: true
},

classFour: {
    type: Array,
    required: true
},

classFive: {
    type: Array,
    required: true
},

date: {
    type: Date,
    default: Date.now
}, 

saved : {
    type: Boolean,
    default: true,
    required: true
},

schemaClass : {
    type: Array,
    default: false,
}
  
});

// const Class = mongoose.model("Class", ClassSchema);
const Class = con.myFirstDatabase.model("Class", ClassSchema);
module.exports = Class;