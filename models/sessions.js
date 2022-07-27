const { DataTypes } = require("sequelize");
const { sequelize } = require("../util/db");

const Sessions = sequelize.define(
  "sessions",
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
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      }
  },
  {
    sequelize,
    timestamps: false,
    modelName: "sessions",
  }
);

module.exports = Sessions;
