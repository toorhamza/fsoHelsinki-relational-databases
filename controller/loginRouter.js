const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = require("express").Router();

const { SECRET } = require("../util/config");
const { Users } = require("../models");

router.post("/", async (request, response, next) => {
  try {
    const body = request.body;
    const user = await Users.findOne({
      where: {
        username: body.username,
      },
    });
    const passwordCorrect = await bcrypt.compare(body.password, user.password);

    if (!user || !passwordCorrect) {
      return response
        .status(401)
        .json({ error: "invalid username or password" });
    }

    const userForToken = {
      username: user.username,
      id: user.id,
    };

    const token = jwt.sign(userForToken, SECRET);

    response
      .status(200)
      .send({ token, username: user.username, name: user.name });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
