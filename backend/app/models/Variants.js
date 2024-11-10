module.exports = (sequelize, Sequelize) => {
  const Variant = sequelize.define(
    "variant",
    {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      productId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      colorId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      styleId: {
        type: Sequelize.UUID,
        // allowNull: false,
      },
      discount: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
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

  Variant.associate = (models) => {
    Variant.hasMany(models.VariantSize, {
      foreignKey: "variantId",
      constraints: false,
    });
    Variant.hasMany(models.Image, {
      foreignKey: "principalId",
      constraints: false,
    });
    Variant.hasMany(models.Wishlist, {
      foreignKey: "variantId",
      constraints: false,
    });
  };

  // Variant.associate = (models) => {
  //   // Variant associations
  //   Variant.belongsTo(models.Product, {
  //     foreignKey: "productId",
  //     constraints: false,
  //   });
  //   Variant.hasMany(models.VariantSize, {
  //     foreignKey: "variantId",
  //     constraints: false,
  //   });
  // };

  return Variant;
};
