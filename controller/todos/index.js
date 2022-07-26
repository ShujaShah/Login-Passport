const TodoTask = require("../../models/ToDoTask");
const TODOS = require("../../models/usecases/todo");
const todos = require("../../routes/index");
const session = require("express-session");

module.exports = {
  getAllTodos: function (req, res) {
    TodoTask.find({ "user.id": req.user._id }, (err, tasks) => {
      res.render("todo.ejs", {
        todoTasks: tasks,
        user: req.user,
      });
      console.log(tasks);
    });
  },

  createTodo: async function (req, res) {
    const todoTask = new TodoTask({
      content: req.body.content,
      user: {
        id: req.user._id,
        user: req.user.user,
      },
    });
    try {
      await todoTask.save(function (err, doc) {
        if (err) throw err;
        console.log("item saved!");
      });

      res.redirect("/dashboard");
    } catch (err) {
      res.redirect("/dashboard");
      console.log(err);
    }
  },

  getTodo: async function (req, res) {
    const id = req.params.id;
    TodoTask.find({}, (err, tasks) => {
      res.render("todoEdit.ejs", { todoTasks: tasks, idTask: id });
    });
  },
  editTodo: async function (req, res) {
    const id = req.params.id;
    TodoTask.findByIdAndUpdate(id, { content: req.body.content }, (err) => {
      if (err) return res.send(500, err);
      res.redirect("/");
    });
  },

  deleteTodo: async function (req, res) {
    const id = req.params.id;
    TodoTask.findByIdAndRemove(id, (err) => {
      if (err) return res.send(500, err);
      res.redirect("/");
    });
  },
};
