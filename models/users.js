const { DataTypes } = require("sequelize");
const { sequelize } = require("../util/db");

const Users = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: "users",
    hooks: {
      beforeCreate: function (blogs, options, fn) {
        blogs.createdAt = new Date();
        blogs.updatedAt = new Date();
        sequelize.fn(null, blogs);
      },
      beforeUpdate: function (blogs, options, fn) {
        blogs.updatedAt = new Date();
        sequelize.fn(null, blogs);
      },
    },
  }
);

module.exports = Users;
