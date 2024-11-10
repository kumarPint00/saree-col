const {
  Wishlist,
  sequelize,
  Cart,
  Variant,
  VariantSize,
  Image,
} = require("../models");
const { Op } = require("sequelize");

exports.addItemToCart = async (req, res, next) => {
  let { userId, sessionId, variantId, variantSizeId } = req.body;
  let transaction;
  try {
    transaction = await sequelize.transaction();
    if (!variantId || !variantSizeId) {
      throw new Error("variantId or variantSizeId is missing");
    }
    const query = {
      variantId: variantId,
      variantSizeId: variantSizeId,
      deletedAt: null,
    };
    if (userId) {
      query.userId = userId;
    } else if (sessionId) {
      query.sessionId = sessionId;
    } else {
      throw new Error("Either userId or sessionId must be provided");
    }
    const existingCartItem = await Cart.findOne({
      where: query,
      transaction,
    });
    if (existingCartItem) {
      existingCartItem.qty += 1;
      await existingCartItem.save({ transaction });
    } else {
      await Cart.create(
        {
          userId: userId,
          sessionId: sessionId,
          variantId: variantId,
          variantSizeId: variantSizeId,
          qty: 1,
        },
        { transaction },
      );
    }
    await transaction.commit();
    res.status(201).json({ message: "Item added to cart successfully" });
  } catch (error) {
    console.log(error);
    if (transaction) await transaction.rollback();
    next(error);
  }
};

exports.updateCartVariantQty = async (req, res, next) => {
  let { variantId, variantSizeId, newQty, userId, sessionId } = req.body;
  let transaction;
  try {
    transaction = await sequelize.transaction();
    if (!variantId || !variantSizeId || !newQty || newQty <= 0) {
      res.status(401).json({
        success: false,
        message: "variantId or variantSizeId or newQty is missing",
      });
    }
    const query = {
      variantId: variantId,
      variantSizeId: variantSizeId,
      deletedAt: null,
    };
    if (userId) {
      query.userId = userId;
    } else if (sessionId) {
      query.sessionId = sessionId;
    } else {
      res.status(401).json({
        success: false,
        message: "Either userId or sessionId must be provided",
      });
    }
    const existingCartItem = await Cart.findOne({
      where: query,
      transaction,
    });
    if (!existingCartItem) {
      res.status(401).json({
        success: false,
        message: "Item not found in the cart",
      });
    }
    existingCartItem.qty = newQty;
    await existingCartItem.save({ transaction });
    await transaction.commit();
    res.status(201).json({
      success: true,
      message: "Cart item quantity updated successfully",
    });
  } catch (err) {
    if (transaction) await transaction.rollback();
    next(err);
  }
};

exports.removeItemFromCart = async (req, res, next) => {
  let { variantId, variantSizeId, userId, sessionId } = req.body;
  let transaction;
  try {
    transaction = await sequelize.transaction();
    if (!variantId || !variantSizeId) {
      return res.status(400).json({
        success: false,
        message: "variantId or variantSizeId is missing",
      });
    }
    const query = {
      variantId: variantId,
      variantSizeId: variantSizeId,
      deletedAt: null,
    };
    if (userId) {
      query.userId = userId;
    } else if (sessionId) {
      query.sessionId = sessionId;
    } else {
      return res.status(400).json({
        success: false,
        message: "Either userId or sessionId must be provided",
      });
    }
    const existingCartItem = await Cart.findOne({
      where: query,
      transaction,
    });
    if (!existingCartItem) {
      return res.status(404).json({
        success: false,
        message: "Item not found in the cart",
      });
    }
    await existingCartItem.destroy({ transaction });
    await transaction.commit();
    return res.status(200).json({
      success: true,
      message: "Item removed from the cart successfully",
    });
  } catch (error) {
    if (transaction) await transaction.rollback();
    next(error);
  }
};

exports.getCartItems = async (req, res, next) => {
  let { userId, sessionId } = req.body;
  try {
    const query = {};
    if (userId) {
      query.userId = userId;
    } else if (sessionId) {
      query.sessionId = sessionId;
    } else {
      return res.status(400).json({
        success: false,
        message: "Either userId or sessionId must be provided",
      });
    }
    const cartItems = await Cart.findAll({
      where: query,
      include: [
        {
          model: Variant,
          include: [{ model: VariantSize }, { model: Image }],
        },
      ],
    });
    return res.status(200).json({
      success: true,
      cartItems: cartItems,
    });
  } catch (error) {
    next(error);
  }
};

exports.clearCart = async (req, res, next) => {
  let { userId, sessionId } = req.body;
  let transaction;
  try {
    transaction = await sequelize.transaction();
    const query = {
      deletedAt: null,
    };
    if (userId) {
      query.userId = userId;
    } else if (sessionId) {
      query.sessionId = sessionId;
    } else {
      return res.status(400).json({
        success: false,
        message: "Either userId or sessionId must be provided",
      });
    }
    // const cartItems = await Cart.findAll({
    //   where: query,
    //   transaction,
    // });
    await Cart.destroy({
      where: query,
      transaction,
    });
    await transaction.commit();
    return res.status(200).json({
      success: true,
      message: "Cart cleared successfully",
    });
  } catch (error) {
    if (transaction) await transaction.rollback();
    next(error);
  }
};

exports.convertCartFromGuestToUser = async (req, res, next) => {
  const { userId, sessionId } = req.body;
  let transaction;
  try {
    transaction = await sequelize.transaction();
    if (!userId || !sessionId) {
      return res.status(400).json({
        success: false,
        message: "Both userId and sessionId must be provided",
      });
    }
    const cartItems = await Cart.findAll({
      where: {
        sessionId: sessionId,
        deletedAt: null,
      },
      transaction,
    });
    if (cartItems.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No cart items found for the provided session ID",
      });
    }
    await Cart.update(
      { userId: userId },
      {
        where: {
          sessionId: sessionId,
          deletedAt: null,
        },
        transaction,
      },
    );
    await transaction.commit();

    return res.status(200).json({
      success: true,
      message: "Cart items converted from guest to user successfully",
    });
  } catch (error) {
    if (transaction) await transaction.rollback();
    next(error);
  }
};

exports.moveItemsToWishlist = async (req, res, next) => {
  const { userId, variantId, variantSizeId } = req.body;
  let transaction;
  try {
    transaction = await sequelize.transaction();
    if (!userId) {
      return res.status(403).json({
        success: false,
        message: "Guest users cannot move items to wishlist",
      });
    }
    if (!variantId || !variantSizeId) {
      return res.status(400).json({
        success: false,
        message: "Both variantId and variantSizeId must be provided",
      });
    }
    const existingWishlistItem = await Wishlist.findOne({
      where: {
        userId: userId,
        variantId: variantId,
        variantSizeId: variantSizeId,
      },
      transaction,
    });
    if (existingWishlistItem) {
      await Cart.destroy({
        where: {
          userId: userId,
          variantId: variantId,
          variantSizeId: variantSizeId,
        },
        transaction,
      });
      await transaction.commit();
      return res.status(200).json({
        success: true,
        message: "Item moved to wishlist successfully",
      });
    }
    await Wishlist.create(
      {
        userId: userId,
        variantId: variantId,
        variantSizeId: variantSizeId,
      },
      { transaction },
    );
    await Cart.destroy({
      where: {
        userId: userId,
        variantId: variantId,
        variantSizeId: variantSizeId,
      },
      transaction,
    });
    await transaction.commit();
    return res.status(200).json({
      success: true,
      message: "Item moved to wishlist successfully",
    });
  } catch (error) {
    if (transaction) await transaction.rollback();
    next(error);
  }
};
