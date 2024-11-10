module.exports = (sequelize, Sequelize) => {
  const LookBookProducts = sequelize.define(
    "lookBookProducts",
    {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      lookBookId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      productId: {
        type: Sequelize.UUID,
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

  LookBookProducts.associate = (models) => {
    LookBookProducts.belongsTo(models.LookBook, {
      foreignKey: "lookBookId",
      as: "book",
      constraints: false,
    });
    LookBookProducts.belongsTo(models.Product, {
      foreignKey: "productId",
      as: "product",
      constraints: false,
    });
  };

  // LookBookProducts.associate = (models) => {
  //   // LookBookProducts associations
  //   LookBookProducts.belongsTo(models.LookBook, {
  //     foreignKey: "lookBookId",
  //     constraints: false,
  //   });
  //   LookBookProducts.belongsTo(models.Product, {
  //     foreignKey: "productId",
  //     constraints: false,
  //   });
  // };

  return LookBookProducts;
};
