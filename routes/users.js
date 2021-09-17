const router = require("express").Router();
const Spot = require("../models/Spot.model");
const User = require("../models/User.model");
const fileUpload = require("../config/cloudinary.config");

// router.get("/users-list", async (req,res) => {
//     const users = await User.find();
//     res.render("users/users-list", {users});
// });

//http://localhost:3000/user/1234567123
router.get("/user/:userId/", async (req,res) => {
    const user = await User.findById(req.params.userId).populate("spots");
    res.render("users/user-profile", {
        user, 
        ourUser: req.session.currentUser
    });
});

//http://localhost:3000/users/:userId/edit
router.get("/user/:userId/edit", async (req,res) => {
    const user = await User.findById(req.params.userId);
    // req.session.currentUser._id
    res.render("users/user-edit", user);
})

router.post("/user/:userId/edit", fileUpload.single("image"), async (req,res) => {
    let fileUrlOnCloudinary = "";
    if(req.file) {
        fileUrlOnCloudinary = req.file.path; //the path on cloudinary
    } 

    const {username, nationality, description, funFact} = req.body;
    await User.findByIdAndUpdate(req.params.userId, {
        username,
        nationality,
        description,
        funFact,
        imageUrl: fileUrlOnCloudinary,
    });
    res.redirect(`/user/${req.params.userId}`);
});

module.exports = router;