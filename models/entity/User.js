const string = require("joi/lib/types/string");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      //required: true,
      //unique: true,
    },
    email: {
      type: String,
      //required: true,
      unique: true,
    },
    password: {
      type: String,
      //required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    admin: Boolean,
    google: {
      googleId: {
        type: String,
      },
      displayName: {
        type: String,
      },
      firstName: {
        type: String,
      },
      lastName: {
        type: String,
      },
      image: {
        type: String,
      },
    },
    facebook: {
      facebookId: {
        type: String,
      },
      name: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
