const mongoose = require("mongoose");
const ChatContentSchema = new mongoose.Schema({

chatId: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Chat',
    required: true,
},
  
content: {
    type: Array,
    required: false,
},

date: {
    type: Date,
    default: Date.now
}
  
});
const ChatContent = mongoose.model("ChatContent", ChatContentSchema);
module.exports = ChatContent;