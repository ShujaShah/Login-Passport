"use strict";
const express = require("express");
const router = express.Router();
const TodoTask = require("../models/entity/ToDoTask");
const {
  ensureAuthenticated,
  forwardAuthenticated,
} = require("../controller/authentication/index");

const { isAdmin } = require("../controller/authentication/adminAuthMiddleware");

const todos = require("../controller/todos/index");
const {
  getAllTodos,
  createTodo,
  getTodo,
  editTodo,
  deleteTodo,
} = require("../controller/todos/index");

const { getLandingPage } = require("./web/index");

// Welcome Page
//router.get("/", forwardAuthenticated, (req, res) => res.render("landing"));
router.get("/", forwardAuthenticated, getLandingPage);
router.get("/dashboard", ensureAuthenticated, getAllTodos);
router.get("/admin-dashboard", ensureAuthenticated, getAllTodos);
router.post("/dashboard", createTodo);
router.route("/edit/:id").get(getTodo).post(editTodo);
router.route("/remove/:id").get(deleteTodo);

router.get("/admin-dashboard", isAdmin, (req, res) =>
  res.render("admin-dashboard")
);

module.exports = router;
