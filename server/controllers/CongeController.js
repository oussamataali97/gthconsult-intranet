const Conge = require("../models/Conge")
const Admin = require("../models/Admin");
const AWS = require("aws-sdk");
const {
  DO_SPACES_ENDPOINT,
  DO_SPACES_KEY,
  DO_SPACES_SECRET,
  DO_SPACES_NAME,
} = require("../config");
const spacesEndpoint = new AWS.Endpoint(DO_SPACES_ENDPOINT);
const s3 = new AWS.S3({
  endpoint: spacesEndpoint,
  accessKeyId: DO_SPACES_KEY,
  secretAccessKey: DO_SPACES_SECRET,
});

var ObjectId = require('mongodb').ObjectID;



// select conge with Admin
exports.selectCongeAdmin = async (req, res, next) => {

    let { adminId } = req.body;

    const admin = await Admin.findOne({ _id : adminId});

    const conge = await Conge.findOne({ adminId : adminId });
    // const conge = await Conge.findOne({ adminId : adminId }, { history: { $slice: -1 } });


    if(conge == null) {
            res.status(200).json({ conges : admin.dateEmbauche });
    } else {



        const date = new Date();

        var years = [date.getFullYear(), date.getFullYear() + 1, date.getFullYear() + 2 ];

        var histories = [];
        
        for(let i = 0; i < conge.history.length; i++) {
            histories.push(conge.history[i]);
        }


        var dateLastDemande = null
        var resets = 0;

        for(let i = histories.length - 1; i >= 0; i--) {
            if(histories[i].status == true && years.includes(histories[i].year) && histories[i].typeAbsence == "Congé annuel") {
                dateLastDemande = histories[i].dateFinConge;
                resets = resets + parseInt(histories[i].reset);
                break;
            }
            console.log(histories[i])
        }

        console.log(dateLastDemande, resets)

        res.status(200).json({ conges : dateLastDemande, reset : resets });
    }
};
// select conge with Admin
exports.readConges = async (req, res, next) => {

    const conges = await Conge.find();

    if(conges.length > 0) {
        var histories = [];
        for(let i = 0; i < conges.length; i++) {
            console.log(conges[i])
            for(let j = 0; j < conges[i].history.length; j++) {
                histories.push(conges[i].history[j])
            }
        }

        histories.sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
        });

        if(histories.length > 0) {
            res.json({ data : histories}).status(200)
        } else{
            res.json({ data : null }).status(200)
        }


    } else {
        res.json({ data : null }).status(200)
    }

};


// display Absence
exports.displayAbsence = async (req, res, next) => {

    const filename = req.params.filename;
    let x = await s3
      .getObject({
        Bucket: DO_SPACES_NAME,
        Key: filename,
      })
      .promise();
    res.writeHead(200, {
      "Content-Type": "application/pdf",
    });
    res.write(x.Body, "binary");
    res.send();
};


// delete Absence
exports.deleteAbsence = async (req, res, next) => {

    console.log(req.body);


    try {

        // if(req.body.filename.length > 1) {

        //       for(let i = 0; i < req.body.filename.length; i++) {
        //           await s3.deleteObject({ Bucket: DO_SPACES_NAME, Key: filename[i] }).promise();
        //       }

        //       await Conge.updateMany(
        //         { adminId : req.body.adminId}, 
        //         { $pull: { history: { id: req.body.id } } },
        //         false, // Upsert
        //         true, // Multi
        //     )
        //     .then((result) => {
        //         res.status(200).json({ msg: "Les absence a été supprimé avec succès" , result : result });
        //       })
        //       .catch((error) => {
        //         res.status(200).json({ msg: error.message });
        //       });
        // }

        if(typeof req.body.filename == "string") {

            await s3.deleteObject({ Bucket: DO_SPACES_NAME, Key: req.body.filename }).promise();

            await Conge.updateOne(
                { 'adminId': req.body.adminId }, 
                { $pull: { history: { _id: req.body.id } } },
                false, // Upsert
                true, // Multi
            )
            .then((result) => {
                    console.log(result)
                    res.status(200).json({ msg: "L' absence a été supprimé avec succès" , result : result });
                })
            .catch((error) => {
                    console.log(error.message)
                    res.status(200).json({ msg: error.message });
            });

        }

    } catch (err) {
        console.log(err.message)
      res.status(400).json({ msg: err.message });
    }
};

// valide Absence
exports.valideAbsence = async (req, res, next) => {

    try {

            await Conge.findOneAndUpdate(
                    { 
                    
                        adminId: req.body.adminId, "history._id": req.body.id
                    },
                    { 
                      $set: {
                           'history.$.status': true
                        }
                    }
            )
            .then((result) => {
                    console.log(result);
                    res.status(200).json({ msg: "L' absence a été modfié avec succès" , result : result });
                })
            .catch((error) => {
                    console.log(error.message)
                    res.status(200).json({ msg: error.message });
            });

        

    } catch (err) {
        console.log(err.message)
      res.status(400).json({ msg: err.message });
    }
};

exports.invalideAbsence = async (req, res, next) => {

    console.log(req.body)

    try {

            await Conge.findOneAndUpdate(
                    { 
                    
                        adminId: req.body.adminId.toString(), "history._id": req.body.id
                    },
                    { 
                      $set: {
                           'history.$.status': false
                        }
                    }
            )
            .then((result) => {
                    console.log(result);
                    res.status(200).json({ msg: "L' absence a été modfié avec succès" , result : result });
                })
            .catch((error) => {
                    console.log(error.message)
                    res.status(200).json({ msg: error.message });
            });

        

    } catch (err) {
        console.log(err.message)
      res.status(400).json({ msg: err.message });
    }
};

exports.createe = async (req, res, next) => {

    try {
        console.log("achraf")
        console.log(req.body)

    } catch (err) {
        console.log(err.message)
    }

};

