module.exports = (app) => {
  const wishlist = require("../controllers/wishlist.controller.js");

  var router = require("express").Router();

  // add item to Wishlist
  router.post("/addItemToWishlist", wishlist.addItemToWishlist);

  // remove item to Wishlist
  router.put("/removeItemFromWishlist", wishlist.removeItemFromWishlist);

  // get wishlist with user id
  router.get("/getUserWishlist/:userId", wishlist.getUserWishlist);

  // remove item from cart - remove cart item with user id/session id
  router.put("/moveToCart", wishlist.moveToCart);

  app.use("/api/wishlist", router);
};
