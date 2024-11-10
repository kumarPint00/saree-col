module.exports = (sequelize, Sequelize) => {
  const Countries = sequelize.define(
    "countries",
    {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phoneCode: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      currencyName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      currencySymbol: {
        type: Sequelize.TEXT,
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

  return Countries;
};
