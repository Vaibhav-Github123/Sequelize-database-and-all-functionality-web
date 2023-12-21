const { Sequelize, DataTypes } = require("sequelize");

const connection = new Sequelize(
  process.env.DB,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: 3306,
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
    },
  }
);

connection
  .authenticate()
  .then(() => {
    console.log("connection has been extablished successfully..");
  })
  .catch((err) => {
    console.log(err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = connection;

db.User = require("../models/user")(connection, DataTypes);
db.Product = require("../models/Product")(connection, DataTypes, db.User);
db.Categoriey = require("../models/Categoriey")(connection,DataTypes,db.Product);

db.User.hasMany(db.Product, { foreignKey: "user_id" });
db.Product.belongsTo(db.User, { foreignKey: "user_id" });

// db.Categoriey.hasMany(db.Product, { foreignKey: "product_id" });
// db.Product.belongsTo(db.Categoriey, { foreignKey: "product_id" });

module.exports = db;
