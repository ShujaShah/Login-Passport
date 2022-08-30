const todo = require("../entity/ToDoTask");
const TodoTask = require("../../models/entity/ToDoTask");

const getAllTodos = async (req, res) => {
  if (req.user.admin === true) {
    const task = await TodoTask.find({})
      .populate("user", "name -_id")
      .exec((err, tasks) => {
        return res.render("admin-dashboard.ejs", {
          todoTasks: tasks,
          displayName: req.user.name,
        });
      });
  } else {
    TodoTask.find({ user: req.user._id }, (err, tasks) => {
      res.render("todo.ejs", {
        todoTasks: tasks,
        user: req.user,
      });
      console.log(tasks);
    });
  }
};

const createTodo = async function (req, res) {
  const todoTask = await new TodoTask({
    content: req.body.content,
    user: req.user._id,
  });
  try {
    await todoTask.save(function (err, doc) {
      if (err) throw err;
      console.log("item saved!", todoTask);
    });
    return res.redirect("/dashboard");
  } catch (err) {
    return res.redirect("/dashboard");
    console.log(err);
  }
};

const getTodo = async function (req, res) {
  const id = req.params.id;
  if (req.user.admin === true) {
    TodoTask.find({}, (err, tasks) => {
      return res.render("todoEdit.ejs", { todoTasks: tasks, idTask: id });
    });
  } else
    TodoTask.find({ "user.id": req.user._id }, (err, tasks) => {
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
