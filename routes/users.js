const router = require("express").Router();
const Spot = require("../models/Spot.model");
const User = require("../models/User.model");

router.get("/users-list", async (req,res) => {
    const users = await User.find();
    res.render("users/users-list", {users});
});

//http://localhost:3000/user/1234567123
router.get("/user/:userId/", async (req,res) => {
    const user = await User.findById(req.params.userId);
    res.render("users/user-profile", user);
});

//http://localhost:3000/users/:userId/edit
router.get("/user/:userId/edit", async (req,res) => {
    const user = await User.findById(req.params.userId);
    // req.session.currentUser._id
    res.render("users/user-edit", user);
})

router.post("/user/:userId/edit", async (req,res) => {
    const {username, nationality, description, funFact, imageUrl} = req.body;
    await User.findByIdAndUpdate(req.params.userId, {
        username,
        nationality,
        description,
        funFact,
        imageUrl,
    });
    res.redirect(`/user/${req.params.userId}`);
});

module.exports = router;