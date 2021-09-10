// ℹ️ Connects to the database
require("../db");
const Spot = require("../models/Spot.model");

const spots = [
    {
      name: "TOPO Martim Moniz",
      type: "Cocktail bar",
      location: "Centro Comercial Martim Moniz 6 Esq, Praça Martim Moniz, 1100-341 Lisboa",
      //budget: Array,
      imageUrl: String,
      //user: ,
      description: [
          {
              opening: String,
              specialties: String,
              review: String,
          }
      ],
      },
      //review: 
      {
          timestamps: true,
      },
    ];

Spot.insertMany(spots).then((spotsFromDB) => {
  console.log(`spots created - ${spotsFromDB.length}`);
});
