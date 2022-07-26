const router = require("express").Router();

const { Blog, Users } = require("../models");

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

router.get("/", async (req, res, next) => {
  try {
    const blogs = await Blog.findAll({
      include: { model: Users, attributes: { exclude: ["userId"] } },

    });
    res.json(blogs);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const username = req.user.username;
    console.log(req.user)
    const user = await Users.findByPk(req.user.id)
    console.log(user)
    const blog = await Blog.create({ ...req.body, author: username, userId: user.id });
    res.json(blog);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", blogFinder, async (req, res) => {
  try {
    if (req.blog) {
      res.json(req.blog);
    } else {
      res.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", blogFinder, async (req, res, next) => {
  try {
    const user = req.user.username
    if (req.blog && req.blog.author === user) {
      await req.blog.destroy();
    } else {
      throw new Error("Can't delete other author's blog")
    }
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

router.put("/:id", blogFinder, async (req, res, next) => {
  try {
    if (req.blog) {
      req.blog.author = req.body.author || req.blog.author;
      req.blog.title = req.body.title || req.blog.title;
      req.blog.url = req.body.url || req.blog.url;
      req.blog.likes = req.body.likes || req.blog.likes;
      await req.blog.save();
      res.json(req.blog);
    } else {
      res.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
