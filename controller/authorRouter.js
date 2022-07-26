const router = require("express").Router();

const { Blog } = require("../models");
const { sequelize } = require("../util/db");

router.get("/", async (req, res, next) => {
  try {
    //group by author and aggregate count of blogs
    const authors = await Blog.findAll({
      group: ["author"],
      attributes: [
        [sequelize.fn("COUNT", sequelize.col("author")), "articles"],
        [sequelize.fn("SUM", sequelize.col("likes")), "likes"],
        "author",
      ],
      order: [[sequelize.fn("SUM", sequelize.col("likes")), "DESC"]],
    });
    res.json(authors);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
