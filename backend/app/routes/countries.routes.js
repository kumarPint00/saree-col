module.exports = (app) => {
  const Country = require("../controllers/country.controller.js");

  var router = require("express").Router();

  // Create a new country
  router.post("/addCountry", Country.create);

  // Retrieve a single country with id
  router.get("/getCountry/:countryId", Country.findOne);

  // Retrieve all supported countries
  router.get("/getAllCountries", Country.findAll);

  // Update a country with id
  router.put("/:id", Country.update);

  // Delete a country with id
  router.delete("/:id", Country.delete);

  app.use("/api/country", router);
};
