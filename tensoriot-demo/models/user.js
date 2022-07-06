const { Sequelize, Model, DataTypes } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database.sqlite",
});

const User = sequelize.define("User", {
  username: DataTypes.STRING,
  password: DataTypes.STRING,
});

// Automatically create all tables
module.exports = { sequelize, User };
