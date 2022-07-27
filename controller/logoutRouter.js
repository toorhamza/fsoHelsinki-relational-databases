const router = require("express").Router();
const { Sessions } = require("../models/index");

router.delete("/", async (req, res) => {
  const session = await Sessions.findByPk(req.user.sessionId);
  await session.destroy();

  res.status(204).send();
});

module.exports = router;
