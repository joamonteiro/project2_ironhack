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

//_____________________________________________________________________________________________

//http://localhost:3000/spots/bar
router.get("/spots/bars", async (req, res) => {
  let bars = [];
  bars = await Spot.find({ type: "Bar" });
  res.render("spots/bars", { bars });
});

//http://localhost:3000/spots/restaurants
router.get("/spots/restaurants", async (req, res) => {
  let restaurants = [];
  restaurants = await Spot.find({ type: "Restaurant" });
  console.log(restaurants);
  res.render("spots/restaurants", { restaurants });
});

//http://localhost:3000/spots/rooftops
router.get("/spots/rooftops", async (req, res) => {
  let rooftops = [];
  rooftops = await Spot.find({ type: "Rooftop" });
  res.render("spots/rooftops", { rooftops });
});

//http://localhost:3000/spots/parks
router.get("/spots/parks", async (req, res) => {
  let parks = [];
  parks = await Spot.find({ type: "Park" });
  res.render("spots/parks", { parks });
});

//http://localhost:3000/spots/art-centers
router.get("/spots/art-centers", async (req, res) => {
  let artcenters = [];
  artcenters = await Spot.find({ type: "Art Center" });
  res.render("spots/art-centers", { artcenters });
});

//http://localhost:3000/spots/museums
router.get("/spots/museums", async (req, res) => {
  let museums = [];
  museums = await Spot.find({ type: "Museum" });
  res.render("spots/museums", { museums });
});

//http://localhost:3000/spots/viewpoints
router.get("/spots/viewpoints", async (req, res) => {
  let viewpoints = [];
  viewpoints = await Spot.find({ type: "Viewpoint" });
  res.render("spots/viewpoints", { viewpoints });
});

//http://localhost:3000/spots/monumentums
router.get("/spots/monumentums", async (req, res) => {
  let monumentums = [];
  monumentums = await Spot.find({ type: "Monument" });
  res.render("spots/monumentums", { monumentums });
});

//_____________________________________________________________________________________________

//http://localhost:3000/favorite-spots
router.get("/favorite-spots", requireLogin, async (req, res) => {
  const user = await User.findById(req.session.currentUser._id).populate(
    "favorites"
  );
  res.render("spots/spots-favorites", user);
});

router.post("/favorite-spots/:spotId", async (req, res) => {
  const spot = await Spot.findById(req.params.spotId);
  await User.findByIdAndUpdate(req.session.currentUser._id, {
    $push: { favorites: spot },
  });

  res.redirect("/favorite-spots");
});

router.post("/favorite-spots/:spotId/delete", async (req, res) => {
  const favorite = await Spot.findById(req.params.spotId);

   await User.findByIdAndUpdate(req.session.currentUser._id, {
     $pull: { favorites: favorite._id }
   });

  res.redirect("/favorite-spots");
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
  const { name, type, location, budget, description } = req.body;

  const createdSpot = await Spot.create({
    user: req.session.currentUser,
    name,
    type,
    location,
    budget,
    imageUrl: fileUrlOnCloudinary,
    description,
  });

  await User.findByIdAndUpdate(req.session.currentUser._id, {
    $push: {
      spots: createdSpot,
    },
  });

  res.redirect("/spots");
});

//http://localhost:3000/books/123412345
router.get("/spots/:spotId", async (req, res) => {
  const spot = await Spot.findById(req.params.spotId).populate("user");
  console.log(req.session.currentUser);
  res.render("spots/spot-details", {
    spot,
    ourUser: req.session.currentUser,
  });
});

//http://localhost:3000/spots/:spotId/edit
router.get("/spots/:spotId/edit", async (req, res) => {
  const spot = await Spot.findById(req.params.spotId);
  res.render("spots/spot-edit", { spot });
});

router.post("/spots/:spotId/edit", async (req, res) => {
  const { name, location, description } = req.body;
  await Spot.findByIdAndUpdate(req.params.spotId, {
    name,
    location,
    description,
  });
  res.redirect(`/spots/${req.params.spotId}`);
});

router.post("/spots/:spotId/delete", async (req, res) => {
  await Spot.findByIdAndDelete(req.params.spotId);
  res.redirect("/spots");
});

module.exports = router;
