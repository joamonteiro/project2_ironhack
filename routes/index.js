const router = require("express").Router();
//API
const sunrise = require("sunrise-api");
//Display Lisbon sunset / sunrise time in Lisbon on home page
router.get("/", async (req, res, next) => {
  let sun = await sunrise(38.71667, -9.13333);
  /*  console.log(sun.sunrise);
  console.log(sun.sunset); */
  const theSunrise = new Date(sun.sunrise);
  const hours = theSunrise.getHours() - 1;
  const minutes = theSunrise.getMinutes();
  const seconds = theSunrise.getSeconds();
  const theSunset = new Date(sun.sunset);
  let hourss = theSunset.getHours() - 1;
  let minutess = theSunset.getMinutes();
  let secondss = theSunset.getSeconds();
  if (secondss < 10) {
    secondss = "0" + secondss;
  }
  if (minutess < 10) {
    minutess = "0" + minutess;
  }
  if (hourss < 10) {
    hourss = "0" + hourss;
  }
  console.log("sunset at", hourss, ":", minutess, ":", secondss);
  const sunriseToPass = `
    ${hours}:
    ${minutes}:
    ${seconds}
    `;
  const sunsetToPass = `
  ${hourss}:
  ${minutess}:
  ${secondss}
  `;
  console.log(sunriseToPass, sunsetToPass);
  res.render("index", {sunriseToPass, sunsetToPass});
});
module.exports = router;