module.exports = (app) => {
  const product = require("../controllers/product.controller.js");

  var router = require("express").Router();

  // Create a new product
  router.post("/addProduct", product.create);

  // Retrieve a single product with id
  router.get("/getProduct/:productId", product.findOne);

  // Retrieve all products
  router.get("/getAllproducts", product.findAll);

  // get random products
  router.get("/getRandomProducts", product.findRandom);

  // Retrieve all products with search query
  router.get("/getProducts/:searchQuery", product.findAllBySearchQuery);

  // product filters
  router.post("/getProductsByFilter", product.findAllByFilter);

  // Delete a product with id
  router.delete("/:productId", product.delete);

  // Delete a variant with id
  router.delete("/variant/:variantId", product.deleteVariant);

  // Update a product with id
  router.put("/:id", product.update);

  // add variant
  router.post("/createVariant", product.createVariant);

  // update variant
  router.post("/updateVariant", product.updateVariant);

  app.use("/api/product", router);
};
