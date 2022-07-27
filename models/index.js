const Blog = require("./blog");
const Users = require("./users");
const ReadingList = require("./reading_list");
const Sessions = require("./sessions")

Users.hasMany(Blog);
Blog.belongsTo(Users);

Users.belongsToMany(Blog, { through: ReadingList, as: 'readings' });
Blog.belongsToMany(Users, { through: ReadingList, as: 'readings' });

Users.hasMany(Sessions);
Sessions.belongsTo(Users);

module.exports = {
  Blog,
  Users,
  ReadingList,
  Sessions
};
