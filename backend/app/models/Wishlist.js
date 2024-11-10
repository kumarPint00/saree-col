module.exports = (sequelize, Sequelize) => {
  const Wishlist = sequelize.define(
    "wishlist",
    {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      variantId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      variantSizeId: {
        type: Sequelize.UUID,
        // allowNull: false,
      },
      version: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
        allowNull: false,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
      deletedAt: Sequelize.DATE,
    },
    {
      paranoid: true,
    },
  );

  Wishlist.associate = (models) => {
    Wishlist.belongsTo(models.Variant, {
      foreignKey: "variantId",
      constraints: false,
    });
  };

  // Wishlist.associate = (models) => {
  //   // Example Wishlist associations
  //   // Assuming you have a Wishlist model and it has associations with VariantSize, Product, Variant, and Size models
  //   Wishlist.belongsTo(models.VariantSize, {
  //     foreignKey: "variantSizeId",
  //     constraints: false,
  //   });
  //   Wishlist.belongsTo(models.Product, {
  //     foreignKey: "productId",
  //     constraints: false,
  //   });
  //   Wishlist.belongsTo(models.Variant, {
  //     foreignKey: "variantId",
  //     constraints: false,
  //   });
  // };

  return Wishlist;
};
