require("dotenv").config();
const express = require("express");
const app = express();

const { connectToDb } = require("./util/db");

const blogsRouter = require("./controller/blogsRouter");
const usersRouter = require("./controller/usersRouter");
const loginRouter = require("./controller/loginRouter");
const logoutRouter = require("./controller/logoutRouter");
const authorRoute = require("./controller/authorRouter");
const readinglistRouter = require("./controller/readinglistRouter");

const authenticate = require("./middleware/auth");

app.use(express.json());

app.use("/api/blogs", authenticate, blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use("/api/logout", authenticate, logoutRouter);
app.use("/api/authors", authenticate, authorRoute);
app.use("/api/readinglists", authenticate, readinglistRouter);



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
