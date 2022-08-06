/**
 * top level routes are registered which otherwise you used to define in app.js
 * also you define per user folder for different user roles and then also index will have thier route registration
 */

"use strict";
const express = require("express");
const router = express.Router();

const getLandingPage = function (req, res) {
  return res.render("landing.ejs");
};

module.exports = {
  getLandingPage,
};
