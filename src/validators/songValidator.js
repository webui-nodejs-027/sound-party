const multer = require('multer');
const crypto = require('crypto');
// const { body } = require('express-validator/check');
// const { checkResult } = require('./checkResult');

let hash = null;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'music');
  },
  filename: (req, file, cb) => {
    hash = `${crypto
      .createHash('md5')
      .update(file.originalname)
      .digest('hex')}${Date.now()}.mp3`;
    cb(null, hash);
  }
});

const getSongSrc = () => `sound-party/${hash}`;

const upload = multer({
  storage,
  limits: { fileSize: 20000000 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'audio/mpeg') {
      return cb(new Error('Only mp3 file'));
    }
    return cb(null, true);
  }
}).single('fileName');

module.exports.getSongSrc = getSongSrc;

module.exports.checkBody = [
  (req, res, next) => {
    upload(req, res, err => {
      if (err instanceof multer.MulterError) {
        return res.status(400).json(err.message);
      }
      if (err) {
        return res.status(400).json(err.message);
      }
      return next();
    });
  }
];
