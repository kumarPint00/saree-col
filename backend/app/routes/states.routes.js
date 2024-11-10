module.exports = (app) => {
  const state = require("../controllers/state.controller.js");

  var router = require("express").Router();

  // Create a new state
  router.post("/addState", state.create);

  // Retrieve all statees with country id
  router.get("/getStatesForCountry/:countryId", state.findAll);

  // Delete a state with id
  router.delete("/:id", state.delete);

  // Update a state with id
  router.put("/:id", state.update);

  app.use("/api/state", router);
};
