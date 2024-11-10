module.exports = (sequelize, Sequelize) => {
  const Image = sequelize.define(
    "image",
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      principalType: {
        type: Sequelize.STRING,
        // allowNull: false,
      },
      principalId: {
        type: Sequelize.UUID,
        // allowNull: false,
      },
      fileType: {
        type: Sequelize.STRING,
        // allowNull: false,
      },
      fieldName: {
        type: Sequelize.STRING,
        // allowNull: false,
      },
      blobName: {
        type: Sequelize.STRING,
        // allowNull: false,
      },
      originalName: {
        type: Sequelize.STRING,
        // allowNull: false,
      },
      mimeType: {
        type: Sequelize.STRING,
        // allowNull: false,
      },
      url: {
        type: Sequelize.STRING,
        // allowNull: false,
      },
      etag: {
        type: Sequelize.STRING,
      },
      container: {
        type: Sequelize.STRING,
      },
      encoding: {
        type: Sequelize.STRING,
        // allowNull: false,
      },
      size: {
        type: Sequelize.STRING,
        // allowNull: false,
      },
      createdBy: {
        type: Sequelize.UUID,
        // allowNull: false,
      },
      modifiedBy: {
        type: Sequelize.UUID,
        // allowNull: false,
      },
      version: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
        // allowNull: false,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
      deletedAt: Sequelize.DATE,
    },
    {
      paranoid: true,
    },
  );

  Image.associate = (models) => {
    // Image associations
    Image.belongsTo(models.LookBook, {
      foreignKey: "principalId",
      constraints: false,
    }); // Assuming principalId in Image model refers to LookBook
    Image.belongsTo(models.Product, {
      foreignKey: "principalId",
      constraints: false,
    }); // Assuming principalId in Image model refers to Product
  };

  return Image;
};
