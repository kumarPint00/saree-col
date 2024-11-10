module.exports = (sequelize, Sequelize) => {
  const Payment = sequelize.define(
    "payment",
    {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      orderID: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      currencyCountry: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
      },
      transactionID: {
        type: Sequelize.TEXT,
      },
      transactionReference: {
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

  return Payment;
};
