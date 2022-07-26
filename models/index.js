const Blog = require("./blog");
const Users = require("./users");

Users.hasMany(Blog);
Blog.belongsTo(Users);

module.exports = {
  Blog,
  Users,
};
