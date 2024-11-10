module.exports = (sequelize, Sequelize) => {
  const Cart = sequelize.define(
    "cart",
    {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      userId: {
        type: Sequelize.UUID,
        // allowNull: false,
      },
      sessionId: {
        type: Sequelize.UUID,
        // allowNull: false,
      },
      variantId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      variantSizeId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      qty: {
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

  Cart.associate = (models) => {
    Cart.belongsTo(models.Variant, {
      foreignKey: "variantId",
      constraints: false,
    });
  };

  return Cart;
};
