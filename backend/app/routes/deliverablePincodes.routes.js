module.exports = (app) => {
  const pincode = require("../controllers/pincode.controller.js");

  var router = require("express").Router();

  // Create a new pincode
  router.post("/addPinCode", pincode.create);

  // Retrieve a single pincode with pincode
  router.get("/getPinCodeByCode/:pincodeValue", pincode.findOne);

  // Retrieve a single pincode with Id
  router.get("/getPinCodeById/:pincodeId", pincode.findOneById);

  // Update a pincode with id
  router.put("/:pincodeId", pincode.update);

  // Delete a pincode with pinCode
  router.delete("/:pincodeId", pincode.delete);

  app.use("/api/pincode", router);
};
