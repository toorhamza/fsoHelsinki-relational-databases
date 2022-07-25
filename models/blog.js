const { DataTypes } = require('sequelize');
const { sequelize } = require("../util/db");

const Blogs = sequelize.define('blogs', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  author: {
    type: DataTypes.STRING,
    allowNull: true
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  likes: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
    sequelize,
    timestamps: false,
    modelName: "blogs",
});

module.exports = Blogs;