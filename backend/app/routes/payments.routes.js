module.exports = (app) => {
  const payment = require("../controllers/payment.controller.js");

  var router = require("express").Router();

  // Create a new payment
  router.post("/addpayment", payment.create);

  // Retrieve a single payment with id
  router.get("/getPayment/:id", payment.findOne);

  // Retrieve all payments with user id
  router.get("/getAllUserPayments/:userId", payment.findAll);

  // Update a payment with id
  router.put("/:id", payment.update);

  app.use("/api/payment", router);
};
