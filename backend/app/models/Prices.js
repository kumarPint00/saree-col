module.exports = (sequelize, Sequelize) => {
  const Price = sequelize.define(
    "price",
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
      amountIND: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      amountUK: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      amountCAD: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      amountAUD: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      amountUAED: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      amountEURO: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      amountYEN: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      amountWON: {
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

  return Price;
};
