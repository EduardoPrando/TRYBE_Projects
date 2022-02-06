const multer = require('multer');
const path = require('path');

const fileDirectory = path.resolve(__dirname, '..', 'uploads');

const storage = multer.diskStorage({
  destination: (req, file, callback) => callback(null, fileDirectory),
  filename: (req, file, callback) => callback(null, `${req.params.id}.jpeg`),
});

const upload = multer({ storage }).single('image');

module.exports = upload;
