const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const passport = require("passport");
const flash = require("connect-flash");
const session = require("express-session");
const TodoTask = require("./models/ToDoTask");

const app = express();

//use the stylesheets

app.use("/static", express.static("public"));

// Passport Config
require("./config/passport")(passport);

// // DB Config
const db = require("./config/keys").mongoURI;
mongoose.set("useFindAndModify", false);

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const connection = mongoose.createConnection(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const MongoStore = require("connect-mongo")(session);

// EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

// Express body parser
app.use(express.urlencoded({ extended: true }));

const sessionStore = new MongoStore({
  mongooseConnection: connection,
  collection: "sessionStore",
});

// Express session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, //one day
    },
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables for displaying the flash messages
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

// Routes
app.use("/", require("./routes/index.js"));
app.use("/users", require("./routes/users.js"));

//GET METHOD
// app.get("/dashboard", (req, res) => {
//   TodoTask.find({}, (err, tasks) => {
//     res.render("todo.ejs", { todoTasks: tasks });
//   });
// });

// app.post("/dashboard", async (req, res) => {
//   const todoTask = new TodoTask({
//     content: req.body.content,
//   });
//   try {
//     await todoTask.save();
//     res.redirect("/dashboard");
//   } catch (err) {
//     res.redirect("/dashboard");
//   }
// });

app.listen(3000, console.log(`Server running on 3000`));
