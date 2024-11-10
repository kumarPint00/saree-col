module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define(
    "product",
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
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fabricComposition: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      trims: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      sustainability: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      washCare: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      style: {
        type: Sequelize.TEXT,
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

  Product.associate = (models) => {
    Product.hasMany(models.Variant, {
      foreignKey: "productId",
      constraints: false,
    });
  };

  // Product.associate = (models) => {
  //   // Product associations
  //   Product.hasMany(models.LookBookProducts, {
  //     foreignKey: "productId",
  //     constraints: false,
  //   });
  //   Product.hasMany(models.Variant, {
  //     foreignKey: "productId",
  //     constraints: false,
  //   });
  // };

  return Product;
};
