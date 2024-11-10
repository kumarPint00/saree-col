module.exports = (app) => {
  const user = require("../controllers/user.controller.js");

  var router = require("express").Router();

  // Create a new user
  router.post("/addUser", user.create);

  // Retrieve a single user with id
  router.get("/getUser/:userId", user.findOne);

  // Retrieve all users
  router.get("/getAllUsers", user.findAll);

  // Delete a user with id
  router.delete("/:userId", user.delete);

  // Update a user with id
  router.put("/:userId", user.update);

  // Update a user with id
  router.post("/signIn", user.signIn);

  // lost password
  router.post("/lostPassword", user.lostPassword);

  // verify Email
  router.post("/verifyMail", user.verifyMail);

  // verify Otp
  router.post("/verifyOtp", user.verifyOtp);

  // reset Password
  router.post("/resetPassword", user.resetPassword);

  // send Otp
  router.post("/sendOtp", user.sendOtp);

  app.use("/api/user", router);
};
