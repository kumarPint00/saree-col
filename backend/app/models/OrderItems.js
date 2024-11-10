module.exports = (sequelize, Sequelize) => {
  const OrderItem = sequelize.define(
    "orderItem",
    {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      orderId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      productVariantId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      productVariantSizeId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      productQty: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      itemAmount: {
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

  return OrderItem;
};
