const express = require("express");
const router = express.Router();
const jwt = require("../utils/jwt");
const authToken = jwt.authenticateToken;
const userController = require("../controller/userController");
const taskController = require("../controller/taskController");

module.exports = app => {
  router.post("/login", userController.login);
  router.post("/users", userController.createUser);
  router.post("/assign", authToken, taskController.createTask);
  router.post("/tasks/common", authToken, taskController.listTask);
  router.put("/tasks/:id", authToken, taskController.updateTask);
  router.delete("/tasks/:id", authToken, taskController.deleteTask);

  app.use("/api", router);
};
