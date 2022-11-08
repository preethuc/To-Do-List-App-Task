import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    task: {
      type: String,
    },
    Add_to_list: {
      type: String,
      enum: ["Work", "Personal"],
    },
    status: {
      type: Boolean,
      default: false,
    },
    time: {
      type: String,
    },
    comment: {
      type: String,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
