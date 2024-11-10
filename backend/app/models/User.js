module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "user",
    {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      userName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      mobile: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      verifiedEmail: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      verifiedMobile: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      mailToken: {
        type: Sequelize.TEXT,
      },
      currentOtp: {
        type: Sequelize.INTEGER,
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
      paranoid:true
    },
  );

  return User;
};
