const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const spotSchema = new Schema(
  {
    name: String,
    type: String,
    location: String,
    budget: {
      type: String,
      enum: ["Cheap", "Medium", "Expensive"],
    },
    imageUrl: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
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

const Spot = model("Spot", spotSchema);

module.exports = Spot;
