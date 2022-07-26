const number = require("joi/lib/types/number");
const mongoose = require("mongoose");
const todoTaskSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  user: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    user: String,
  },
});
module.exports = mongoose.model("TodoTask", todoTaskSchema);
