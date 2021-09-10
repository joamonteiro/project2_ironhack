const router = require("express").Router();
const Spot = require("../models/Spot.model");
const bcrypt = require("bcryptjs");
// ********* require fileUploader in order to use it *********
const fileUploader = require('../config/cloudinary.config');

// routes/spots.routes.js
// ... all imports stay unchanged

//... all the routes stay unchanged


module.exports = router;