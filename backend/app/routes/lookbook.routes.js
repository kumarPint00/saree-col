module.exports = (app) => {
  const lookBook = require("../controllers/lookbook.controller.js");
  const image = require("../controllers/image.controller.js");

  var router = require("express").Router();

  // Create a new lookBook
  router.post("/addLookBook", image.uploadMiddleware, lookBook.create);

  // Retrieve a single lookBook with id
  router.get("/getLookBook/:id", lookBook.findOne);

  // Retrieve all lookBooks with user id
  router.get("/getAllLookBooks", lookBook.findAll);

  // Retrieve lookBooks for homepage
  router.get("/getHomePageLookBooks", lookBook.getHomePageLookBooks);

  // Delete a lookBook with id
  router.delete("/:id", lookBook.delete);

  // Update a lookBook with id
  router.put("/", image.uploadMiddleware, lookBook.update);

  app.use("/api/lookBook", router);
};
