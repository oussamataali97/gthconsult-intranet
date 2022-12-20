const { JWT_SECRET } = require('../config');
const jwt = require('jsonwebtoken');
const Admin = require("../models/Admin");
const Frais = require("../models/Frais");
const Calendrier = require("../models/Calendrier");

// login Admin
exports.login = async (req, res, next) => {

     const { email, password } = await req.body;

    const existEmail = await Admin.find({ email : email});

    if(existEmail[0] == null) {
        res.status(200).json({ msg: false });
    } else {

        const existEmailPassword = await Admin.find({ email : email, password: password});

                    if(existEmailPassword.length != 0) {
                        //Create token
                        const token = jwt.sign(
                            { email: email },
                            JWT_SECRET,
                            {
                                expiresIn: "2h",
                            }
                        );
                        res.status(200).json({ msg: true , token: token, res: existEmail });
                    } else {
                        res.status(200).send({ msg: false });
                    }

    }

}

// read All admin
exports.read = async (req, res, next) => {

    const admins = await Admin.find();

    res.status(200).json({ admins });

}

// read All admin or Inspecteur
exports.getAdmin = async (req, res, next) => {

    const admin = await Admin.findOne({ _id : req.body.adminId})
    res.status(200).json({ admin });

}


// read Admin Online
exports.Online = async (req, res, next) => {

    const { adminId } = req.body;

    await Admin.updateOne({ _id : adminId }, { $set : { connected : true } })
    .then((result) => {
        res.status(200).json({ response : result });
    })
    .catch((error) => {
        console.log(error);
    });

}

// reject Online
exports.rejectOnline = async (req, res, next) => {

    const { adminId } = req.body;

    await Admin.updateOne({ _id : adminId }, { $set : { connected : false } })
    .then((result) => {
        res.status(200).json({ response : result });
    })
    .catch((error) => {
        console.log(error);
    });

}

// check Notification Frais
exports.checkNotificationFrais = async (req, res, next) => {

    const { adminId } = req.body;

    const admin = await Admin.findById(adminId);

    if(admin.status == "admin") {

        const notification = await Frais.find({ notification : true });

        const countNotification = notification.length;
    
        res.status(200).json({ response : countNotification });
    
    } else {
        res.status(200).json({ response : 0 });
    }

}

// // Delete check Notification Frais
exports.deleteCheckNotificationFrais = async (req, res, next) => {


    const { adminId, fraiId } = req.body;

    const admin = await Admin.findById(adminId);

    if(admin.status == "admin") {


        await Frais.findByIdAndUpdate(fraiId, { $set: { notification : false } })
        .then((response) => {
          res.json({response}).status(200);
        })
        .catch((err) => {
          res.json({msg : err.message}).status(200);
        });
    
    }



}

// check Notification Calendrier
exports.checkNotificationCalendrier = async (req, res, next) => {

    const { adminId } = req.body;

    const notification = await Calendrier.find({ notification : true , inspecteur : { $elemMatch : { name : adminId } } });

    const countNotification = notification.length;

    res.status(200).json({ response : countNotification });

}





//  Delete check Notification Calendrier
exports.deleteCheckNotificationCalendrier = async (req, res, next) => {

    const { adminId } = req.body;

    await Calendrier.updateMany({ notification : true , inspecteur : { $elemMatch : { name : adminId } } }, { $set: { notification : false } })
    .then((result) => {
        res.status(200).json({ response : result });
    })
    .catch((error) => {
        res.status(200).json({ response : error.message });
    });

}



