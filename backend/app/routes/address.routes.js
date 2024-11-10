module.exports = (app) => {
  const address = require("../controllers/address.controller.js");

  var router = require("express").Router();

  // Create a new Address
  router.post("/addAddress", address.create);

  // Retrieve a single Address with id
  router.get("/getAddress/:addressId", address.findOne);

  // Retrieve all Addresses with user id
  router.get("/getAllUserAddresses/:userId", address.getAllUserAddresses);

  // Delete a address with id
  router.delete("/:addressId", address.delete);

  // Update a address with id
  router.put("/:addressId", address.update);

  app.use("/api/address", router);
};
