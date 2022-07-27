const jwt = require("jsonwebtoken");
const { SECRET } = require("../util/config");
const { Sessions } = require("../models");


const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, SECRET, async (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;
      const sessionId = user.sessionId;
      const session = await Sessions.findByPk(sessionId);
    if (!session) {
    return res.status(401).json({ error: "token invalid" });
    }
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

module.exports = authenticate;
