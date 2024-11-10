module.exports = (app) => {
  const image = require("../controllers/image.controller.js");

  var router = require("express").Router();

  // Create a new image
  router.post("/uploadImages", image.uploadMiddleware, image.upload);

  // Retrieve images with principal id
  router.get("/getImages/:principalId", image.findAllByPrincipalId);

  // Delete a image with id
  router.delete("/:id", image.delete);

  app.use("/api/image", router);
};
