module.exports = (sequelize, Sequelize) => {
  const LookBook = sequelize.define(
    "lookBook",
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
      showInHomePage: {
        type: Sequelize.BOOLEAN,
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

  LookBook.associate = (models) => {
    LookBook.hasMany(models.LookBookProducts, {
      foreignKey: "lookBookId",
      as: "bookProducts",
      constraints: false,
    });
    LookBook.belongsToMany(models.Product, {
      through: models.LookBookProducts,
      foreignKey: "lookBookId",
      as: "products",
      constraints: false,
    });
    LookBook.hasMany(models.Image, {
      foreignKey: "principalId",
      constraints: false,
    });
  };

  // LookBook.associate = (models) => {
  //   LookBook.hasMany(models.LookBookProducts, {
  //     foreignKey: "lookBookId",
  //     constraints: false,
  //   });
  // };

  return LookBook;
};
