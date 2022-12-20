const mongoose = require("mongoose");
const ChatSchema = new mongoose.Schema({

adminOneId: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Admin',
    required: true,
},
  
adminTowId: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Admin',
    required: true,
},

date: {
    type: Date,
    default: Date.now
}
  
});
const Chat = mongoose.model("Chat", ChatSchema);
module.exports = Chat;