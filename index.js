require("dotenv").config();
const express = require("express");
const app = express();

const Blog = require("./models/blog");

app.use(express.json());

app.get("/api/blogs", async (req, res) => {
  const blogs = await Blog.findAll();
  res.json(blogs);
});

app.post("/api/blogs", async (req, res) => {
  console.log(req.body);
  const blog = await Blog.create({ ...req.body });
  return res.json(blog);
});

app.delete("/api/blogs/:id", async (req, res) => {
  console.log("executed");
  const blog = await Blog.findByPk(req.params.id);
  if (blog) {
    await blog.destroy();
    return res.json(blog);
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
