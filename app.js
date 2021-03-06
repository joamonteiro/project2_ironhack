// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

//adding helpers feature to handlebars
const helpers = require("handlebars-helpers");
hbs.registerHelper(helpers());

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

const session = require("express-session");
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: {
      sameSite: true, //both fe and be are running on the same hostname
      httpOnly: true, //we are not using https
      maxAge: 60000000, //session time */
    },
    rolling: true,
  })
);

function getCurrentLoggedUser(req, res, next) {
  if (req.session && req.session.currentUser) {
    app.locals.loggedInUser = req.session.currentUser; //req.session.currentUser.username;
  } else {
    app.locals.loggedInUser = "";
  }
  next();
}

app.use(getCurrentLoggedUser);

// default value for title local
const projectName = "project2";
const capitalized = (string) =>
  string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)} created with IronLauncher`;

// 👇 Start handling routes here
const index = require("./routes/index");
app.use("/", index);
const auth = require("./routes/auth");
app.use("/", auth);
const spots = require("./routes/spots");
app.use("/", spots);
const users = require("./routes/users");
app.use("/", users);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
