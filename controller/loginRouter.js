const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = require("express").Router();

const { SECRET } = require("../util/config");
const { Users, Sessions } = require("../models");

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

    if (user.disabled) {
      return response.status(401).json({ error: "User is disabled" });
    }

    const session = await Sessions.create({ userId: user.id });

    const userToken = {
      username: user.username,
      id: user.id,
      sessionId: session.id,
    };

    const token = jwt.sign(userToken, SECRET);

    response
      .status(200)
      .send({ token, username: user.username, name: user.name });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
