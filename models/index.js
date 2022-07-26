const Blog = require('./blog')
const Users = require('./users')


Blog.sync()
Users.sync()

module.exports = {
    Blog,
    Users
}