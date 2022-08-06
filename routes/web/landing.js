"use strict";
const express = require("express");
const router = express.Router();
// const TodoTask = require("../models/ToDoTask");
const {
  ensureAuthenticated,
  forwardAuthenticated,
} = require("../controller/authentication/index");

//const { isAdmin } = require("../controller/authentication/adminAuthMiddleware");
//const todos = require("../controller/todos/index");

const {
  getAllTodos,
  createTodo,
  getTodo,
  editTodo,
  deleteTodo,
} = require("../controller/todos/index");

// Welcome Page
// router.get("/", forwardAuthenticated, (req, res) => res.render("landing"));
router.get("/", (req, res, next) => {
  if (req.isAuthenticated() && req.user.admin === true) {
    res.redirect("/admin/admin_dashboard");
  } else if (req.isAuthenticated && req.user.isAdmin === false) {
    res.redirect("/user/user_dashboard");
  } else {
    res.redirect("/landing");
  }
});
router.get(
  "/dashboard",
  ensureAuthenticated,
  ensureAdminAuthenticated,
  getAllTodos
); // all todos is possible for admin only
router.post("/dashboard", createTodo);
router.route("/edit/:id").get(getTodo).post(editTodo);
router.route("/remove/:id").get(deleteTodo);

module.exports = router;
