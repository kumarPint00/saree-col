const express = require("express");
const cors = require("cors");
const multer = require("multer");

const app = express();

const upload = multer();

var corsOptions = {
  origin: "*", //"http://localhost:8081"
};

require("dotenv").config();

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// app.use(upload.none());

// app.use((req, res, next) => {
//   console.log(req, "it came here ###################");
//   next();
// });

const db = require("./app/models");

db.sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

require("./app/routes/countries.routes")(app);
require("./app/routes/states.routes")(app);
require("./app/routes/address.routes")(app);
require("./app/routes/categories.routes")(app);
require("./app/routes/deliverablePincodes.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/products.routes")(app);
require("./app/routes/images.routes")(app);
require("./app/routes/lookbook.routes")(app);
require("./app/routes/wishlist.routes")(app);
require("./app/routes/cart.routes")(app);
require("./app/routes/orders.routes")(app);
// require("./app/routes/prices.routes")(app);
// require("./app/routes/payments.routes")(app);
// require("./app/routes/department.routes")(app);

// Call associate function for each model
Object.values(db).forEach((model) => {
  if (model.associate) {
    model.associate(db);
  }
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Internal Server Error");
});

// set port, listen for requests
const PORT = process.env.PORT || 9758;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
