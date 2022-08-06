module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash("error_msg", "Please log in to view that resource");
    res.redirect("/users/login");
  },
  forwardAuthenticated: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect("/");
  },

  // isAdmin: (req, res, next) => {
  //   if (req.isAuthenticated() && req.user.admin) {
  //     return next();
  //     res.redirect("/admin-dashboard");
  //   } else {
  //     res.status(401).json({ msg: "You are not authorized to view this page" });
  //   }
  // },
};
