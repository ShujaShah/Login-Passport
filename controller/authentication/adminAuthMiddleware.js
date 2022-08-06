module.exports = {
  isAdmin: (req, res, next) => {
    if (req.isAuthenticated() && req.user.admin) {
      return next();
      res.redirect("/admin-dashboard");
    } else {
      res.status(401).json({ msg: "You are not authorized to view this page" });
    }
  },
};
