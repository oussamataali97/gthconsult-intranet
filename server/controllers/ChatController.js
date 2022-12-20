const Chat = require("../models/Chat");
const ChatContent = require("../models/ChatContent");

// create room chat
exports.create = async (req, res, next) => {
    // req body
    const { currentContact, matricule } = req.body;

    const adminOne = matricule;
    const adminTow = currentContact;



    // check exist room between admins
    const checkRoomOne = await Chat.findOne({ adminOneId : adminOne , adminTowId : adminTow });
    const checkRoomTow = await Chat.findOne({ adminOneId : currentContact , adminTowId : adminOne });


    if(checkRoomOne != null) {

        await ChatContent.findOne({ chatId: checkRoomOne._id })
        .then((result) => {

            if(result != null) {

                const content = result.content.map(element => {
                    // create vu
                    if((element.clientId != matricule) == true) {
                        element.vu = true;
                    }

                    return element;
                });

            
                ChatContent.updateMany({ chatId : checkRoomOne._id }, { $set : { content : content }})
                .then((result) => {
                    res.status(200).json({ msg : checkRoomOne._id, result : result });
                })
                .catch((error) => {
                    console.log(error)
                });

            } else {
                res.status(200).json({ msg : checkRoomOne._id, result : result });
            }

        })
        .catch((error) => {
            console.log(error)
        });
    }  

    if(checkRoomTow != null) {

        await ChatContent.findOne({ chatId: checkRoomTow._id })
        .then((result) => {

            if(result != null) {

                const content = result.content.map(element => {
                    // create vu
                    if((element.clientId != matricule) == true) {
                        element.vu = true;
                    }
                    
                    return element;
                });


                ChatContent.updateMany({ chatId : checkRoomTow._id }, { $set : { content : content }})
                .then((result) => {
                    res.status(200).json({ msg : checkRoomTow._id, result : result });
                })
                .catch((error) => {
                    console.log(error)
                });
            } else {
                res.status(200).json({ msg : checkRoomTow._id, result : result });
            }

        })
        .catch((error) => {
            console.log(error)
        });

    }  

    if(checkRoomOne == null) {
        if(checkRoomTow == null) {

            await Chat({
                adminOneId : adminOne,
                adminTowId : adminTow
            }).save()
            .then(async (result) => {
                    await ChatContent({
                        chatId : result._id,
                        date : "today",
                        message: 'message',
                        clientId : 'clientId'
                    })
                    .save()
                    .then(() => {
                        res.status(200).json({ msg : result._id });
                    })
                    .catch((err) => {
                    res.status(200).json({ msg: err });
                    });
            })
            .catch((error) => {
                res.status(200).json({ msg : error.message });
            });

        }
    }

};