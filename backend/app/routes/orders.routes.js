module.exports = (app) => {
  const order = require("../controllers/order.controller.js");

  var router = require("express").Router();

  // Create a new order
  router.post("/createOrder", order.createOrder);
  
  // scrap the existing order
  router.post("/scrapOrder", order.scrapOrder);  // add authentication

  // // Retrieve a single order with id
  // router.get("/getOrder/:id", order.findOne);

  // // Retrieve all orders with user id
  // router.get("/getAllUserOrders/:userId", order.findAll);

  // //   // Delete a order with id
  // //   router.delete("/:id", order.delete);

  // // Update a order with id
  // router.put("/:id", order.update);

  app.use("/api/order", router);
};

// checkout ->
// create an order, order items
// generate payment -> cod, online
// update payment status -> pending, success, failed
// update order status -> pending, shipped, delivered, cancelled, return
// send an email to user
// send an email to admin
// delete an order item
// do partial refund
// send order cancellation email to user
// create return
// send return email to user
// send return email to admin
//
