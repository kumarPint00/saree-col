const db = require("../models");
const { States, sequelize } = require("../models");
const Op = db.Sequelize.Op;

// Create State
exports.create = async (req, res, next) => {
  try {
    let statesData = req.body;
    if (!Array.isArray(statesData)) {
      statesData = [statesData];
    }
    // Start transaction
    const t = await sequelize.transaction();
    try {
      const createdStates = await States.bulkCreate(statesData, {
        transaction: t,
      });
      // Commit transaction
      await t.commit();
      res.status(201).json(createdStates);
    } catch (error) {
      // Rollback transaction if any error occurs
      await t.rollback();
      throw error; // Re-throw the error to be caught by the global error handler
    }
  } catch (error) {
    next(error); // Pass the error to the central error handler
  }
};

// Find All States
exports.findAll = async (req, res, next) => {
  try {
    const states = await States.findAll();
    res.json(states);
  } catch (error) {
    next(error); // Pass the error to the central error handler
  }
};

// Update State
exports.update = async (req, res, next) => {
  try {
    const { stateId } = req.params;
    const updatedStateData = req.body;
    // Start transaction
    const t = await sequelize.transaction();
    try {
      const [updatedRowsCount] = await States.update(updatedStateData, {
        where: { id: stateId },
        returning: true, // Return the updated record
        transaction: t,
      });
      if (updatedRowsCount === 0) {
        throw new Error("State not found");
      }
      // Commit transaction
      await t.commit();
      res.status(200).json({ message: "State updated successfully" });
    } catch (error) {
      // Rollback transaction if any error occurs
      await t.rollback();
      throw error; // Re-throw the error to be caught by the global error handler
    }
  } catch (error) {
    next(error); // Pass the error to the central error handler
  }
};

// Delete State
exports.delete = async (req, res, next) => {
  try {
    const { stateId } = req.params;
    // Start transaction
    const t = await sequelize.transaction();
    try {
      const deletedRowCount = await States.destroy({
        where: { id: stateId },
        transaction: t,
      });
      if (deletedRowCount === 0) {
        throw new Error("State not found");
      }
      // Commit transaction
      await t.commit();
      res.status(204).end();
    } catch (error) {
      // Rollback transaction if any error occurs
      await t.rollback();
      throw error; // Re-throw the error to be caught by the global error handler
    }
  } catch (error) {
    next(error); // Pass the error to the central error handler
  }
};
