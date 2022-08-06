const TodoTask = require("../../models/entity/ToDoTask");
const TODOS = require("../../models/usecases/todo");

module.exports = {
  // getAllTodos: async function (req, res) {
  //   tasksWithUsers = [{}];

  //   if (req.user.admin === true) {
  //     TodoTask.find({}, (err, tasks) => {
  //       res.render("admin-dashboard.ejs", {
  //         todoTasks: tasks,
  //         user: req.user,
  //       });
  //     });
  //   } else {
  //     TodoTask.find({ "user.id": req.user._id }, (err, tasks) => {
  //       res.render("todo.ejs", {
  //         todoTasks: tasks,
  //         user: req.user,
  //       });
  //       console.log(tasks);
  //     });
  //   }
  // },

  getAllTodos: async (req, res) => {
    try {
      console.log("inside the controller of all todos");
      let todos = await TODOS.getAllTodos(req, res);
      return todos;
    } catch (error) {
      console.error(error);
    }
  },

  createTodo: async (req, res) => {
    try {
      let newTODO = await TODOS.createTodo(req, res);
      return newTODO;
      if (newTODO) {
        return await res.status(200).json({ statusCode: "200", newTODO });
      } else {
        return await res.status(404).json({ statusCode: "404", newTODO: {} });
      }
    } catch (error) {
      console.error(error.message);
    }
  },

  getTodo: async (req, res) => {
    console.log("inside controller particular todo");
    let particularTODO = await TODOS.getTodo(req, res);
    return particularTODO;
    if (particularTODO) {
      res.status(200).json({ statusCode: "200", particularTODO });
    } else {
      res.status(404), json({ statusCode: "404", particularTODO: {} });
    }
  },

  editTodo: async (req, res) => {
    console.log("inside controller edit todo");
    let editTodo = await TODOS.editTodo(req, res);
    return editTodo;
    if (editTodo) {
      res.status(200).json({ statusCode: "200", editTodo });
    } else {
      res.status(404), json({ statusCode: "404", editTodo: {} });
    }
  },

  deleteTodo: async (req, res) => {
    console.log("inside controller of the delete todo");
    let deleteTodo = await TODOS.deleteTodo(req, res);
    return deleteTodo;
    if (deleteTodo) {
      res.status(200).json({ statusCode: "200", deleteTodo });
    } else {
      res.status(404), json({ statusCode: "404", deleteTodo: {} });
    }
  },
};
