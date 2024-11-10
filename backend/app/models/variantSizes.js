module.exports = (sequelize, Sequelize) => {
  const VariantSizes = sequelize.define(
    "variantSize",
    {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      variantId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      sizeId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      quantity: {
        type: Sequelize.INTEGER,
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

  VariantSizes.associate = (models) => {
    // VariantSize associations
    VariantSizes.belongsTo(models.Variant, {
      foreignKey: "variantId",
      constraints: false,
    });
  };

  return VariantSizes;
};
