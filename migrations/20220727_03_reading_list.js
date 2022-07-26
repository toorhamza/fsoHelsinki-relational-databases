const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable("reading_lists", {
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
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable("readinglist");
  },
};