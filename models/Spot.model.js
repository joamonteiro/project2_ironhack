const mongoose = require("mongoose");
/* const { Schema, model, Mongoose } = require("mongoose"); */

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const spotSchema = new mongoose.Schema(
  {
    name: String,
    type: {
      type: String,
      enum: ["1", "2", "3", "4", "5", "6", "7"],
    },
    location: String,
    budget: {
      type: String,
      enum: ["1", "2", "3", "4"],
    },
    imageUrl: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    description: [
      {
        opening: String,
        specialties: String,
        review: String,
      },
    ],
  },
  //review:
  {
    timestamps: true,
  }
);

const Spot = mongoose.model("Spot", spotSchema);

module.exports = Spot;
