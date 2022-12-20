const Salarie = require("../models/Salarie");
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


// Read Salarie
exports.read = async (req, res, next) => {
    const salaries = await Salarie.find();
    res.status(200).json({ salaries });
};

// select Salarie
exports.select = async (req, res, next) => {
    const { salarieId } = req.body;
    const salarie = await Salarie.findById(salarieId);
    res.status(200).json({ salarie });
};

// dispaly documents in browser
exports.displaySalarie =  async (req, res) => {
    const filename = req.params.filename;
    console.log(filename);
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
}