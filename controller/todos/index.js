const TodoTask = require("../../models/ToDoTask");
const TODOS = require("../../models/usecases/todo");
const todos = require("../../routes/index");

module.exports = {
  getAllTodos: function (req, res) {
    TodoTask.find({}, (err, tasks) => {
      res.render("todo.ejs", { todoTasks: tasks, user: req.user });
    });
  },

  createTodo: async function (req, res) {
    const todoTask = new TodoTask({
      content: req.body.content,
    });
    try {
      await todoTask.save();
      res.redirect("/dashboard");
    } catch (err) {
      res.redirect("/dashboard");
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
