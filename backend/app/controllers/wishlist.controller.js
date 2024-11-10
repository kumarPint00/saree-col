const {
  Wishlist,
  sequelize,
  Product,
  Variant,
  Image,
  VariantSize,
  Cart,
} = require("../models");

exports.addItemToWishlist = async (req, res, next) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();
    const { userId, variantId, variantSizeId } = req.body;
    const existingItem = await Wishlist.findOne({
      where: { userId, variantId },
    });
    if (existingItem) {
      return res
        .status(400)
        .json({ error: "Item already exists in the wishlist" });
    }
    const newItem = await Wishlist.create(
      { userId, variantId, variantSizeId },
      { transaction },
    );
    await transaction.commit();
    res.status(201).json(newItem);
  } catch (err) {
    if (transaction) await transaction.rollback();
    next(err);
  }
};

exports.removeItemFromWishlist = async (req, res, next) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();
    const { userId, variantId } = req.body;
    const deletedItem = await Wishlist.destroy({
      where: { userId, variantId },
      transaction,
    });
    if (!deletedItem) {
      await transaction.rollback();
      return res.status(404).json({ error: "Item not found in the wishlist" });
    }
    await transaction.commit();
    res.json({ message: "Item removed from wishlist" });
  } catch (err) {
    if (transaction) await transaction.rollback();
    next(err);
  }
};

exports.getUserWishlist = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const wishlistItems = await Wishlist.findAll({
      where: { userId },
      include: [
        {
          model: Variant,
          include: [{ model: VariantSize }, { model: Image }],
        },
      ],
    });
    res.json(wishlistItems);
  } catch (err) {
    // next(err);
    res.status(401).json({ error: err.message });
  }
};

exports.moveToCart = async (req, res, next) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();
    const { userId, variantId, variantSizeId } = req.body;
    const [cartItem, created] = await Cart.findOrCreate({
      where: { userId, variantId, variantSizeId },
      defaults: { qty : 1 },
      transaction,
    });
    if (!created) {
      await Cart.update(
        { qty: cartItem.qty + qty },
        { where: { userId, variantId }, transaction },
      );
    }
    await Wishlist.destroy({ where: { userId, variantId }, transaction });
    await transaction.commit();
    res.json({ message: "Item moved to cart successfully" });
  } catch (err) {
    if (transaction) await transaction.rollback();
    next(err);
  }
};
