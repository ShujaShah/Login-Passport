const express = require("express");
const router = express.Router();
const TodoTask = require("../models/ToDoTask");
const {
  ensureAuthenticated,
  forwardAuthenticated,
} = require("../controller/authentication/index");

const todos = require("../controller/todos/index");
const {
  getAllTodos,
  createTodo,
  getTodo,
  editTodo,
  deleteTodo,
} = require("../controller/todos/index");

// Welcome Page
router.get("/", forwardAuthenticated, (req, res) => res.render("welcome"));
router.get("/dashboard", ensureAuthenticated, getAllTodos);
router.post("/dashboard", createTodo);
router.route("/edit/:id").get(getTodo).post(editTodo);
router.route("/remove/:id").get(deleteTodo);

module.exports = router;
