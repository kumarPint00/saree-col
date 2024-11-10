const db = require("../models");
const Op = db.Sequelize.Op;
const { DeliverablePincodes, sequelize } = require("../models");

// Create Pincode
exports.create = async (req, res, next) => {
  try {
    let pincodesData = req.body;
    if (!Array.isArray(pincodesData)) {
      pincodesData = [pincodesData];
    }
    // Start transaction
    const t = await sequelize.transaction();
    try {
      const createdPincodes = await DeliverablePincodes.bulkCreate(
        pincodesData,
        {
          transaction: t,
        },
      );
      // Commit transaction
      await t.commit();
      res.status(201).json(createdPincodes);
    } catch (error) {
      // Rollback transaction if any error occurs
      await t.rollback();
      throw error; // Re-throw the error to be caught by the global error handler
    }
  } catch (error) {
    next(error); // Pass the error to the central error handler
  }
};

// Find Pincode by pincode value
exports.findOne = async (req, res, next) => {
  try {
    const { pincodeValue } = req.params;

    const pincode = await DeliverablePincodes.findOne({
      where: { pinCode: pincodeValue },
    });

    if (!pincode) {
      res.status(404).json({ message: "Pincode not found" });
    } else {
      res.json(pincode);
    }
  } catch (error) {
    next(error); // Pass the error to the central error handler
  }
};

// Find Pincode by ID
exports.findOneById = async (req, res, next) => {
  try {
    const { pincodeId } = req.params;

    const pincode = await DeliverablePincodes.findByPk(pincodeId);

    if (!pincode) {
      res.status(404).json({ message: "Pincode not found" });
    } else {
      res.json(pincode);
    }
  } catch (error) {
    next(error); // Pass the error to the central error handler
  }
};

// Update Pincode
exports.update = async (req, res, next) => {
  try {
    const { pincodeId } = req.params;
    const updatedPincodeData = req.body;

    // Start transaction
    const t = await sequelize.transaction();

    try {
      const [updatedRowsCount] = await DeliverablePincodes.update(
        updatedPincodeData,
        {
          where: { id: pincodeId },
          returning: true, // Return the updated record
          transaction: t,
        },
      );

      if (updatedRowsCount === 0) {
        throw new Error("Pincode not found");
      }

      // Commit transaction
      await t.commit();

      res.status(200).json({ message: "Pincode updated successfully" });
    } catch (error) {
      // Rollback transaction if any error occurs
      await t.rollback();
      throw error; // Re-throw the error to be caught by the global error handler
    }
  } catch (error) {
    next(error); // Pass the error to the central error handler
  }
};

// Delete Pincode
exports.delete = async (req, res, next) => {
  try {
    const { pincodeId } = req.params;

    // Start transaction
    const t = await sequelize.transaction();

    try {
      const deletedRowCount = await DeliverablePincodes.destroy({
        where: { id: pincodeId },
        transaction: t,
      });

      if (deletedRowCount === 0) {
        res.status(200).json({ message: "Pincode deleted successfully" });
      }

      // Commit transaction
      await t.commit();

      res.status(200).json({ message: "Pincode deleted successfully" });
    } catch (error) {
      // Rollback transaction if any error occurs
      await t.rollback();
      throw error; // Re-throw the error to be caught by the global error handler
    }
  } catch (error) {
    next(error); // Pass the error to the central error handler
  }
};
