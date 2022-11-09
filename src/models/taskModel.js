import mongoose, { isObjectIdOrHexString } from "mongoose";

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
      type: String,
      enum: ["Done","Not yet started","Pending"]
    },
    day: {
      type: String,
    },
    comment: {
      type: String,
    },
  },
 {versionKey:false}
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
