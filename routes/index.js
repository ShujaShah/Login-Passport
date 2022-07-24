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

//crud operations of Todo lists

//Read the todos
router.get("/dashboard", ensureAuthenticated, (req, res) => {
  TodoTask.find({}, (err, tasks) => {
    res.render("todo.ejs", { todoTasks: tasks, user: req.user });
  });
});

//create the todos
router.post("/dashboard", async (req, res) => {
  const todoTask = new TodoTask({
    content: req.body.content,
  });
  try {
    await todoTask.save();
    res.redirect("/dashboard");
  } catch (err) {
    res.redirect("/dashboard");
  }
});

//update the todos
router
  .route("/edit/:id")
  .get((req, res) => {
    const id = req.params.id;
    TodoTask.find({}, (err, tasks) => {
      res.render("todoEdit.ejs", { todoTasks: tasks, idTask: id });
    });
  })
  .post((req, res) => {
    const id = req.params.id;
    TodoTask.findByIdAndUpdate(id, { content: req.body.content }, (err) => {
      if (err) return res.send(500, err);
      res.redirect("/");
    });
  });

//delete the todo
router.route("/remove/:id").get((req, res) => {
  const id = req.params.id;
  TodoTask.findByIdAndRemove(id, (err) => {
    if (err) return res.send(500, err);
    res.redirect("/");
  });
});

module.exports = router;
