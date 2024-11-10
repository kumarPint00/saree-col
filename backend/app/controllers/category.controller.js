const db = require("../models");
const { Category, sequelize } = require("../models");
const Op = db.Sequelize.Op;

// Create Category
exports.create = async (req, res, next) => {
  try {
    let categoriesData = req.body;
    if (!Array.isArray(categoriesData)) {
      categoriesData = [categoriesData];
    }

    // Start transaction
    const t = await sequelize.transaction();

    try {
      const createdCategories = await Category.bulkCreate(categoriesData, {
        transaction: t,
      });

      // Commit transaction
      await t.commit();

      res.status(201).json(createdCategories);
    } catch (error) {
      // Rollback transaction if any error occurs
      await t.rollback();
      throw error; // Re-throw the error to be caught by the global error handler
    }
  } catch (error) {
    next(error); // Pass the error to the central error handler
  }
};

// Find One Category
exports.findOne = async (req, res, next) => {
  try {
    const { categoryId } = req.params;

    const category = await Category.findByPk(categoryId);

    if (!category) {
      res.status(404).json({ message: "Category not found" });
    } else {
      res.json(category);
    }
  } catch (error) {
    next(error); // Pass the error to the central error handler
  }
};

// Find All Categories
exports.findAll = async (req, res, next) => {
  try {
    const categories = await Category.findAll();

    res.json(categories);
  } catch (error) {
    next(error); // Pass the error to the central error handler
  }
};

// Update Category
exports.update = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const updatedCategoryData = req.body;

    // Start transaction
    const t = await sequelize.transaction();

    try {
      const [updatedRowsCount] = await Category.update(updatedCategoryData, {
        where: { id: categoryId },
        returning: true, // Return the updated record
        transaction: t,
      });

      if (updatedRowsCount === 0) {
        res.status(400).json({ message: "Category not found" });
      }

      // Commit transaction
      await t.commit();

      res.status(200).json({ message: "Category updated successfully" });
    } catch (error) {
      // Rollback transaction if any error occurs
      await t.rollback();
      throw error; // Re-throw the error to be caught by the global error handler
    }
  } catch (error) {
    next(error); // Pass the error to the central error handler
  }
};

// Delete Category
exports.delete = async (req, res, next) => {
  try {
    const { categoryId } = req.params;

    // Start transaction
    const t = await sequelize.transaction();

    try {
      const deletedRowCount = await Category.destroy({
        where: { id: categoryId },
        transaction: t,
      });

      if (deletedRowCount === 0) {
        res.status(200).json({ message: "Category deleted successfully" });
      }

      // Commit transaction
      await t.commit();

      res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
      // Rollback transaction if any error occurs
      await t.rollback();
      throw error; // Re-throw the error to be caught by the global error handler
    }
  } catch (error) {
    next(error); // Pass the error to the central error handler
  }
};
