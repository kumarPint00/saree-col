module.exports = (app) => {
  const department = require("../controllers/department.controller.js");

  var router = require("express").Router();

  // Create a new department
  router.post("/addDepartment", department.create);

  // Retrieve a single department with id
  router.get("/getDepartment/:id", department.findOne);

  // Retrieve all departmentes with user id
  router.get("/getAllDepartments", department.findAll);

  // Delete a department with id
  router.delete("/:id", department.delete);

  // Update a department with id
  router.put("/:id", department.update);

  app.use("/api/department", router);
};
