import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    phone_number: {
      type: String,
    },
    otp: {
      type: Number,
    },
  },

  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
