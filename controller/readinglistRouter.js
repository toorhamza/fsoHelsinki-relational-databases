const router = require("express").Router();

const { ReadingList } = require("../models");

router.post("/", async (req, res, next) => {
  try {
    const readingList = await ReadingList.create({
      ...req.body,
      user_id: req.body.userId,
      blog_id: req.body.blogId,
    });
    res.json(readingList);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const readingList = await ReadingList.findOne({
      where: {
        id: req.params.id,
      },
    });
    readingList.read = req.body.read;
    await readingList.save();
    res.json(readingList);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
