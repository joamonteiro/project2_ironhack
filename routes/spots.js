const router = require("express").Router();
const Spot = require("../models/Spot.model");
const bcrypt = require("bcryptjs");

// routes/spots.routes.js
// ... all imports stay unchanged

// **** require Spot model in order to use it ****
const Spot = require('../models/Spot.model');

// ********* require fileUploader in order to use it *********
const fileUploader = require('../config/cloudinary.config');

//... all the routes stay unchanged


module.exports = router;