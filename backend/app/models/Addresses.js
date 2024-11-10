module.exports = (sequelize, Sequelize) => {
  const Address = sequelize.define(
    "address",
    {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      firstName: {
        type: Sequelize.STRING,
      },
      lastName: {
        type: Sequelize.STRING,
      },
      mobileNumber: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      isPrimary: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      line1: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      line2: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      line3: {
        type: Sequelize.TEXT,
      },
      city: {
        type: Sequelize.STRING,
        //   references: {
        //     model: "cities",
        //     key: "id",
        //   },
      },
      stateId: {
        type: Sequelize.UUID,
        //   references: {
        //     model: "states",
        //     key: "id",
        //   },
      },
      countryId: {
        type: Sequelize.UUID,
        //   references: {
        //     model: "countries",
        //     key: "id",
        //   },
      },
      pinCode: {
        type: Sequelize.STRING,
      },
      // latLong: {
      //   type: Sequelize.GEOMETRY,
      // },
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
        allowNull: false,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
      deletedAt: Sequelize.DATE,
    },
    {
      paranoid: true, // Enable soft-deletion
    },
  );

  return Address;
};
