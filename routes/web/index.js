/**
 * top level routes are registered which otherwise you used to define in app.js
 * also you define per user folder for different user roles and then also index will have thier route registration
 */
const router = (module.exports = require("express")());

router.use("/", require("./landing"));
