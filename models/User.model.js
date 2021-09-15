const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    password: String,
    nationality: String,
    description: String,
    funFact: String,
    imageUrl: {
      type: String,
      default:"https://picsum.photos/200",
    }
    ,
    spots: [
      {
      type: Schema.Types.ObjectId,
      ref: "Spot"
      }
    ],
    favorites: [
      {
        type: Schema.Types.ObjectId,
        ref: "Spot"
      }
    ],
  },
  //registration: 
    {
      timestamps: true,
    },
);

const User = model("User", userSchema);

module.exports = User;
