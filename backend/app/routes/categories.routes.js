module.exports = (app) => {
  const category = require("../controllers/category.controller.js");

  var router = require("express").Router();

  // Create a new category
  router.post("/createCategory", category.create);

  // Retrieve a single category with id
  router.get("/getCategory/:categoryId", category.findOne);

  // Retrieve all categories
  router.get("/getAllCategories", category.findAll);

  // Update a category with id
  router.put("/:categoryId", category.update);

  // Delete a category with categoryId
  router.delete("/:categoryId", category.delete);

  app.use("/api/category", router);
};
