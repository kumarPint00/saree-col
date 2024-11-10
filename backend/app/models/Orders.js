module.exports = (sequelize, Sequelize) => {
  const Order = sequelize.define(
    "order",
    {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      customOrderId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      orderDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      orderAmount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      orderCurrency: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      paymentType: {
        type: Sequelize.STRING, //from category - online, cod,
        allowNull: false,
      },
      paymentStatus: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      deliveryAddressId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      deliveryStatus: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      estimatedDeliveryDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      actualDeliveryDate: {
        type: Sequelize.DATE,
      },
      currentStatus: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      trackingId: {
        type: Sequelize.TEXT,
      },
      trackingURL: {
        type: Sequelize.STRING,
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      searchableText: {
        type: Sequelize.TEXT,
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

  return Order;
};
