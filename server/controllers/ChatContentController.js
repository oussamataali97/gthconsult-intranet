const Admin = require("../models/Admin");
const ChatContent = require("../models/ChatContent");

// create room chat
exports.create = async (req, res, next) => {
    // req body

    const {
        chatId,
        message,
        clientId
      } = req.body;


      // Get info admin and date

      const today = new Date();
      const admin = await Admin.findById(clientId);
      const nom = admin.nom;
      const prenom = admin.prenom;

      
    // // check exist message in Roo
    const checkRoomContent = await ChatContent.findOne({ chatId : chatId});

    if(checkRoomContent != null) {

        await ChatContent.updateOne({ chatId: chatId }, { $push: { "content": { date : today, name : `${nom} ${prenom}`, vu : false, message: message , clientId : clientId } } })
        .then(async () => {
          res.status(200).json({ msg: "Succes"});
        })
        .catch((err) => {
          res.status(200).json({ msg: err.message });
        });

    } else {

        await ChatContent({
            chatId : chatId,
            content : {
                date : today,
                name : `${nom} ${prenom}`,
                vu : false,
                message: message,
                clientId : clientId
            },
        })
        .save()
        .then(() => {
          res.status(200).json({ msg : "Succes" });
        })
        .catch((err) => {
          res.status(200).json({ msg: err });
        });

    }


};