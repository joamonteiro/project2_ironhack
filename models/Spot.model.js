const mongoose = require("mongoose");
/* const { Schema, model, Mongoose } = require("mongoose"); */

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const spotSchema = new mongoose.Schema(
  {
    name: String,
    type: [
      {
      type: String,
      enum: ["Bar", "Restaurant", "Rooftop", "Park", "Art Center", "Museum", "Viewpoint", "Monument"],
      }
    ],
    location: String,
    budget: {
      type: String,
      enum: ["Free (Public Space)", "Cheap (below 10€)", "Average", "Expensive (above 50€)"],
    },
    imageUrl: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    description: String,
  },
  /* review:
  {
    timestamps: true,
  } */
);

const Spot = mongoose.model("Spot", spotSchema);

module.exports = Spot;
