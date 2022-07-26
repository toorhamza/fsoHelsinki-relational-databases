const { DataTypes } = require("sequelize");
const { sequelize } = require("../util/db");

const ReadingList = sequelize.define(
  "reading_list",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "users", key: "id" },
    },
    blogId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "blogs", key: "id" },
    },
    read: {
      type: DataTypes.BOOLEAN,
      default: false,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: "reading_list",
  }
);

module.exports = ReadingList;
