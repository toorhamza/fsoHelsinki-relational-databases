const Blog = require("./blog");
const Users = require("./users");

Users.hasMany(Blog);
Blog.belongsTo(Users);

Blog.sync({ alter: true })
Users.sync({ alter: true })

module.exports = {
  Blog,
  Users,
};
