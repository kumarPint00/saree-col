const { Country, sequelize } = require("../models");

exports.create = async (req, res, next) => {
  try {
    let countriesData = req.body;
    if (!Array.isArray(countriesData)) {
      countriesData = [countriesData];
    }
    // Start transaction
    const t = await sequelize.transaction();

    try {
      const createdCountries = await Country.bulkCreate(countriesData, {
        transaction: t,
      });

      // Commit transaction
      await t.commit();

      res.status(201).json(createdCountries);
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
    const { countryId } = req.params;
    const country = await Country.findByPk(countryId);
    if (!country) {
      res.status(404).json({ message: "Country not found" });
    } else {
      res.json(country);
    }
  } catch (error) {
    next(error); // Pass the error to the central error handler
  }
};

exports.findAll = async (req, res, next) => {
  try {
    const countries = await Country.findAll();

    res.json(countries);
  } catch (error) {
    next(error); // Pass the error to the central error handler
  }
};

exports.update = async (req, res, next) => {
  try {
    const { countryId } = req.params;
    const updatedCountryData = req.body;

    // Start transaction
    const t = await sequelize.transaction();

    try {
      const [updatedRowsCount] = await Country.update(updatedCountryData, {
        where: { id: countryId },
        returning: true, // Return the updated record
        transaction: t,
      });

      if (updatedRowsCount === 0) {
        throw new Error("Country not found");
      }

      // Commit transaction
      await t.commit();

      res.status(200).json({ message: "Country updated successfully" });
    } catch (error) {
      // Rollback transaction if any error occurs
      await t.rollback();
      throw error; // Re-throw the error to be caught by the global error handler
    }
  } catch (error) {
    next(error); // Pass the error to the central error handler
  }
};

exports.delete = async (req, res, next) => {
  try {
    const { countryId } = req.params;

    // Start transaction
    const t = await sequelize.transaction();

    try {
      const deletedRowCount = await Country.destroy({
        where: { id: countryId },
        transaction: t,
      });

      if (deletedRowCount === 0) {
        throw new Error("Country not found");
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
