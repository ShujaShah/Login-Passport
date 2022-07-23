const express = require("express");
const router = express.Router();
const TodoTask = require("../models/ToDoTask");
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");

// Welcome Page
router.get("/", forwardAuthenticated, (req, res) => res.render("welcome"));

// Dashboard
// router.get("/dashboard", ensureAuthenticated, (req, res) =>
//   res.render("dashboard", {
//     user: req.user,
//   })
// );

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  TodoTask.find({}, (err, tasks) => {
    res.render("todo.ejs", { todoTasks: tasks, user: req.user });
  });
});

module.exports = router;
