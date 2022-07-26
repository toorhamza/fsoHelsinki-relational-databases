const { DataTypes } = require("sequelize");
const { sequelize } = require("../util/db");

const Blogs = sequelize.define(
  "blogs",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "users", key: "id" },
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1991,
        max: new Date().getFullYear(),
      },
    },
  },
  {
    sequelize,
    modelName: "blogs",
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

module.exports = Blogs;
