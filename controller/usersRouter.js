const router = require("express").Router();
const bcrypt = require("bcrypt");

const { Users } = require("../models");

const userFinder = async (req, res, next) => {
  req.user = await Users.findByPk(req.params.username);
  next();
};

router.get("/", async (req, res, next) => {
  try {
    const users = await Users.findAll();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    let { username, name, password } = req.body;

    const saltRounds = 10;
    password = await bcrypt.hash(password, saltRounds);

    const user = await Users.create({ username, name, password });
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.put("/:username", userFinder, async (req, res) => {
  try {
    if (req.user) {
      req.user.username = req.body.username || req.user.username;
      await req.user.save();
      res.json(req.user);
    } else {
      res.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

/* router.get("/:id", userFinder, async (req, res) => {
  try {
    if (req.user) {
      res.json(req.user);
    } else {
      res.status(404).end();
    }
  } catch (error) {
    next(error);
  }
}); */

/* router.delete("/:id", userFinder, async (req, res) => {
  try {
  } catch (error) {
    next(error);
  }
  if (req.user) {
    await req.user.destroy();
  }
  res.status(204).end();
}); */

module.exports = router;
