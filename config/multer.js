const multer = require("multer");
const path = require("path");
const fileUploadPath = path.join(__dirname, "../public/prodimage");

function fileFilter(req, file, cb) {
  // The function should call `cb` with a boolean
  // to indicate if the file should be accepted

  // To reject this file pass `false`, like so:
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    return cb(null, true);
  }

  // To accept the file pass `true`, like so:
  cb(null, false);

  // You can always pass an error if something goes wrong:
  cb(new Error("I don't have a clue!"));
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, fileUploadPath);
  },
  filename: function (req, file, cb) {
    //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
  },
});

module.exports = upload = multer({ storage: storage, fileFilter });
