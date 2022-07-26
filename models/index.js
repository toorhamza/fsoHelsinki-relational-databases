const Blog = require("./blog");
const Users = require("./users");
const ReadingList = require("./reading_list")

Users.hasMany(Blog);
Blog.belongsTo(Users);

Users.belongsToMany(Blog, { through: ReadingList, as: 'readings' });
Blog.belongsToMany(Users, { through: ReadingList, as: 'readings' });

module.exports = {
  Blog,
  Users,
  ReadingList
};
