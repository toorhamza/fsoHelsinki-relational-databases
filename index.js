require("dotenv").config();
const express = require("express");
const app = express();

const { connectToDb } = require("./util/db");
const Blog = require("./models/blog");

const blogsRouter = require("./controller/blogsRouter");

app.use(express.json());

app.use("/api/blogs", blogsRouter);

const errorHandler = (error, request, response, next) => {
  console.log(error.message);
  response.status(400).json(JSON.stringify(error.message)).end();
  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;

const start = async () => {
  await connectToDb();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
