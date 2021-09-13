const router = require("express").Router();
const Spot = require("../models/Spot.model");
const bcrypt = require("bcryptjs");
// ********* require fileUploader in order to use it *********
const fileUploader = require('../config/cloudinary.config');

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
    const spots = await Spot.find();
    res.render("spots/spot-create", { spots });
  });
  
router.post("/create-spot", async (req, res) => {
    const { name, type, location, budget, imageUrl /* user, description */ } = req.body;
    await Spot.create({ name, type, location, budget, imageUrl/* user, description */   });
    res.redirect("/spots");
  });

module.exports = router;

//http://localhost:3000/edit-spot


//http://localhost:3000 (delete)