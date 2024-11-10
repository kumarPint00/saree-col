module.exports = (app) => {
  const cart = require("../controllers/cart.controller.js");

  var router = require("express").Router();

  // add variant to user cart - create cart item with user id/session id
  router.post("/addItemToCart", cart.addItemToCart);

  // update cart item qty - update cart item qty with user id/session id
  router.put("/updateCartVariantQty", cart.updateCartVariantQty);

  // remove item from cart - remove cart item with user id/session id
  router.put("/removeItemFromCart", cart.removeItemFromCart);

  // get user cart items - get cart items based on user id/session id
  router.post("/getCartItems", cart.getCartItems);

  // clear user cart - clear cart items from users cart based on user id or session id
  router.put("/clearCart", cart.clearCart);

  // update guest cart with user id
  router.put("/convertCartFromGuestToUser", cart.convertCartFromGuestToUser);

  // move to wishlist
  router.put("/moveItemsToWishlist", cart.moveItemsToWishlist);

  app.use("/api/cart", router);
};
