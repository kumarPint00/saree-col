const db = require("../models");
const Department = db.Department;
const Op = db.Sequelize.Op;

exports.create = async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json(users); // Send the retrieved users as JSON response
  } catch (err) {
    // Pass the error to the next middleware (central error handler)
    next(err);
  }
};
exports.findOne = async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json(users); // Send the retrieved users as JSON response
  } catch (err) {
    // Pass the error to the next middleware (central error handler)
    next(err);
  }
};
exports.findAll = async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json(users); // Send the retrieved users as JSON response
  } catch (err) {
    // Pass the error to the next middleware (central error handler)
    next(err);
  }
};
exports.delete = async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json(users); // Send the retrieved users as JSON response
  } catch (err) {
    // Pass the error to the next middleware (central error handler)
    next(err);
  }
};
exports.update = async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json(users); // Send the retrieved users as JSON response
  } catch (err) {
    // Pass the error to the next middleware (central error handler)
    next(err);
  }
};
