const db = require("../models");
const { Addresses, States, sequelize } = require("../models");
const Op = db.Sequelize.Op;

exports.create = async (req, res, next) => {
  try {
    const {
      userId,
      firstName,
      lastName,
      mobileNumber,
      isPrimary,
      line1,
      line2,
      line3,
      city,
      stateId,
      countryId,
      pinCode,
    } = req.body;
    if (
      !mobileNumber ||
      !line1 ||
      !city ||
      !stateId ||
      !countryId ||
      !pinCode
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    let state = await States.findByPk(stateId);
    if (!state) {
      return res.status(400).json({ message: "invalid state id" });
    }
    const t = await sequelize.transaction();
    try {
      const address = await Addresses.create(
        {
          userId,
          firstName,
          lastName,
          mobileNumber,
          isPrimary,
          line1,
          line2,
          line3,
          city,
          stateId,
          countryId,
          pinCode,
        },
        { transaction: t },
      );
      await t.commit();
      res.status(201).json(address);
    } catch (error) {
      await t.rollback();
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { addressId } = req.params;
    const updatedAddressData = req.body;

    // Validate request data
    if (Object.keys(updatedAddressData).length === 0) {
      return res.status(400).json({ message: "No data provided for update" });
    }

    // Start transaction
    const t = await sequelize.transaction();

    try {
      const [updatedRowsCount] = await Addresses.update(updatedAddressData, {
        where: { id: addressId },
        returning: true, // Return the updated record
        transaction: t,
      });

      if (updatedRowsCount === 0) {
        throw new Error("Address not found");
      }

      // Commit transaction
      await t.commit();

      res.status(200).json({ message: "Address updated successfully" });
    } catch (error) {
      // Rollback transaction if any error occurs
      await t.rollback();
      throw error; // Re-throw the error to be caught by the global error handler
    }
  } catch (error) {
    next(error); // Pass the error to the central error handler
  }
};

exports.findOne = async (req, res, next) => {
  try {
    const { addressId } = req.params;

    const address = await Addresses.findByPk(addressId);

    if (!address) {
      res.status(404).json({ message: "Address not found" });
    } else {
      res.json(address);
    }
  } catch (error) {
    next(error); // Pass the error to the central error handler
  }
};

exports.getAllUserAddresses = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const addresses = await Addresses.findAll({ where: { userId: userId } });

    res.json(addresses);
  } catch (error) {
    next(error); // Pass the error to the central error handler
  }
};

exports.delete = async (req, res, next) => {
  try {
    const { addressId } = req.params;

    // Start transaction
    const t = await sequelize.transaction();

    try {
      const deletedRowCount = await Addresses.destroy({
        where: { id: addressId },
        transaction: t,
      });

      if (deletedRowCount === 0) {
        res.status(200).json({ message: "Address deleted successfully" });
      }

      // Commit transaction
      await t.commit();

      res.status(200).json({ message: "Address deleted successfully" });
    } catch (error) {
      // Rollback transaction if any error occurs
      await t.rollback();
      throw error; // Re-throw the error to be caught by the global error handler
    }
  } catch (error) {
    next(error); // Pass the error to the central error handler
  }
};
