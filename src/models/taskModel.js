import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  task: {
    type: String,
  },
  Add_to_list: {
    type: String,
    enum: ["Personal", "Shopping", "Task", "Work"],
  },
  status: {
    type: Boolean,
    default: false,
  },
  comment: {
    type: String,
    default: {},
  },
  created_on: {
    type: Date,
    default: Date.now() / 1000,
  },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
