module.exports = (app) => {
  const price = require("../controllers/price.controller.js");

  var router = require("express").Router();

  // Create a new price
  router.post("/addPrice", price.create);

  // Retrieve a single price with variant id
  router.get("/getPrice/:variantId", price.findOne);

  // Update a price with id
  router.put("/:id", price.update);

  app.use("/api/price", router);
};
