const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Addresses = require("./Addresses.js")(sequelize, Sequelize);
db.Cart = require("./Cart.js")(sequelize, Sequelize);
db.Category = require("./Category.js")(sequelize, Sequelize);
db.Country = require("./Countries.js")(sequelize, Sequelize);
db.DeliverablePincodes = require("./DeliverablePincodes.js")(
  sequelize,
  Sequelize,
);
db.Department = require("./Department.js")(sequelize, Sequelize);
db.Image = require("./Images.js")(sequelize, Sequelize);
db.LookBook = require("./LookBook.js")(sequelize, Sequelize);
db.OrderItem = require("./OrderItems.js")(sequelize, Sequelize);
db.Order = require("./Orders.js")(sequelize, Sequelize);
db.Payment = require("./Payments.js")(sequelize, Sequelize);
db.Price = require("./Prices.js")(sequelize, Sequelize);
db.Product = require("./Products.js")(sequelize, Sequelize);
db.States = require("./States.js")(sequelize, Sequelize);
db.User = require("./User.js")(sequelize, Sequelize);
db.Variant = require("./Variants.js")(sequelize, Sequelize);
db.Wishlist = require("./Wishlist.js")(sequelize, Sequelize);
db.VariantSize = require("./variantSizes.js")(sequelize, Sequelize);
db.LookBookProducts = require("./LookBookProducts.js")(sequelize, Sequelize);

module.exports = db;
