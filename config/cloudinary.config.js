// config/cloudinary.config.js

const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

const storage = new CloudinaryStorage({
  // cloudinary: cloudinary,
  cloudinary,
  params: {
    folder: 'project-2', // The name of the folder in cloudinary
    allowed_formats: ['jpg', 'png'],
    // resource_type: 'raw' => this is in case you want to upload other type of files, not just images
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

// storage: storage
module.exports = multer({ storage });



