const multer = require('multer');
const crypto = require('crypto');

let hash = null;
const errorMsg = {
  message: 'Validation failed',
  errors: [
    {
      location: 'body',
      param: 'fileName',
      msg: 'Invalid value',
    },
  ],
};

const getContentType = (req, res, next) => {
  if (req.is('multipart/form-data') !== 'multipart/form-data') {
    return res.status(400).json({
      message: 'Invalid content-type',
    });
  }
  return next();
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'music/'),
  filename: (req, file, cb) => {
    if (!Number(req.body.id) && !Number(req.params.id)) {
      errorMsg.errors[0].param = 'id';
      return cb(new Error('Invalid id'));
    }
    hash = `${crypto
      .createHash('md5')
      .update(file.originalname)
      .digest('hex')}${Date.now()}.mp3`;
    return cb(null, hash);
  },
});

const uploadFile = multer({
  storage,
  limits: { fileSize: 20 * 1000000 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'audio/mpeg') {
      return cb(new Error('Invalid file type'));
    }
    return cb(null, true);
  },
}).single('fileName');

const errorHandler = (req, res, next) => {
  uploadFile(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      errorMsg.errors[0].msg = err.message;
      return res.status(400).json(errorMsg);
    }
    if (err) {
      errorMsg.errors[0].msg = err.message;
      return res.status(400).json(errorMsg);
    }
    return next();
  });
  return null;
};

const getSongSrc = () => `E:/sound-party/music/${hash}`;

module.exports.getSongSrc = getSongSrc;

module.exports.checkBody = [getContentType, errorHandler];
