const todo = require("../entity/ToDoTask");
const TodoTask = require("../../models/entity/ToDoTask");

const getAllTodos = async function (req, res) {
  if (req.user.admin === true) {
    TodoTask.find({}, (err, tasks) => {
      return res.render("admin-dashboard.ejs", {
        todoTasks: tasks,
        user: req.user,
      });
    });
  } else {
    TodoTask.find({ "user.id": req.user._id }, (err, tasks) => {
      return res.render("todo.ejs", {
        todoTasks: tasks,
        user: req.user,
      });
      console.log(tasks);
    });
  }
};

const createTodo = async function (req, res) {
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

    return res.redirect("/dashboard");
  } catch (err) {
    return res.redirect("/dashboard");
    console.log(err);
  }
};

const getTodo = async function (req, res) {
  const id = req.params.id;
  TodoTask.find({}, (err, tasks) => {
    return res.render("todoEdit.ejs", { todoTasks: tasks, idTask: id });
  });
};

const editTodo = async function (req, res, next) {
  const id = req.params.id;
  TodoTask.findByIdAndUpdate(id, { content: req.body.content }, (err) => {
    if (err) return res.send(500, err);
    console.log(err);
    return res.redirect("/dashboard");
  });
};

const deleteTodo = async function (req, res) {
  const id = req.params.id;
  TodoTask.findByIdAndRemove(id, (err) => {
    if (err) return res.send(500, err);
    else return res.redirect("/dashboard");
  });
};

module.exports = {
  getAllTodos,
  createTodo,
  getTodo,
  editTodo,
  deleteTodo,
};
