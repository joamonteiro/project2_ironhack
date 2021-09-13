const router = require("express").Router();
const Spot = require("../models/Spot.model");
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
// ********* require fileUpload in order to use it *********
const fileUpload = require("../config/cloudinary.config");

function requireLogin(req, res, next) {
  if (req.session.currentUser) {
    next();
  } else {
    res.redirect("/login");
  }
}

//http://localhost:3000/spots
router.get("/spots", async (req, res) => {
  console.log(req.secret);
  const spots = await Spot.find();
  res.render("spots/spots-list", { spots });
});

//http://localhost:3000/create-spot
router.get("/create-spot", requireLogin, async (req, res) => {
  res.render("spots/spot-create");
});

router.post("/create-spot", fileUpload.single("image"), async (req, res) => {
  let fileUrlOnCloudinary = "";
  if (req.file) {
    fileUrlOnCloudinary = req.file.path;
  }
  const { name, type, location, budget /* user, description */ } = req.body;

  await Spot.create({
    user: req.session.currentUser,
    name,
    type,
    location,
    budget,
    imageUrl: fileUrlOnCloudinary,
  });

  console.log(req.session.currentUser);
  res.redirect("/spots");
});

module.exports = router;
