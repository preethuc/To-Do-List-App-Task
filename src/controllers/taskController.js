import Task from "./../models/taskModel";
import User from "./../models/userModel";

import catchAsync from "./../utils/catchAsync";
import AppError from "./../utils/AppError";
import cron from "node-cron";
import EmailNotification from "../utils/EmailNotification";

// POST - crete To-DO taskList

exports.createTask = catchAsync(async (req, res, next) => {
  const task = await Task.create(req.body);
  if (!task) {
    return next(new AppError("newList not created", 400));
  }
  return res.status(201).json({
    status: "success",
    message: "To-do Task List - Created",
    taskList: task,
  });
});

// GET - All TO-DO List

exports.getAllList = catchAsync(async (req, res, next) => {
  const task = await Task.find().populate("user", "name");
  if (!task) {
    return next(new AppError("failed to get all task", 400));
  }
  return res.status(200).json({
    status: "success",
    message: "All To-do List",
    results: task.length,
    AllTaskList: task,
  });
});

//GET - Task by Id

exports.getTaskById = catchAsync(async (req, res, next) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    return next(new AppError("failed to get single Task", 404));
  }
  return res.status(200).json({
    status: "success",
    message: "Task By Id",
    updatedTask: task,
  });
});

//PUT - Task by Id

exports.updateTask = catchAsync(async (req, res, next) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!task) {
    return next(new AppError("failed to update the Task", 404));
  }
  return res.status(200).json({
    status: "success",
    message: "updated List",
    updatedTask: task,
  });
});

//DELETE - Task by Id

exports.deleteTask = catchAsync(async (req, res, next) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) {
    return next(new AppError("failed to delete the Task", 404));
  }
  return res.status(204).json({
    status: "success",
    task,
  });
});

// PUT - update comment field

exports.addComment = catchAsync(async (req, res, next) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    { comment: req.body.comment },
    { new: true }
  );
  if (!task) {
    return next(new AppError("failed to add comment", 400));
  }
  return res.status(200).json({
    status: "success",
    message: "comment added",
    taskList: task,
  });
});

//GET - Aggregate

exports.getTaskAndStatus = catchAsync(async (req, res, next) => {
  const list = await Task.aggregate([
    {
      $group: {
        _id: { $toUpper: "$Add_to_list" },
        task_name: { $push: "$task" },
        current_status: { $push: "$status" },
      },
    },
  ]);
  res.status(200).json({
    status: "success",
    tasks: list,
  });
});

//GET - Before days task and status

exports.getBeforeDaysTask = catchAsync(async (req, res, next) => {
  const task = await Task.find({ day: req.query.day }).populate("user", "name");
  // $and: [{ time: req.query.time }, { status: req.query.status }],  //to get monday - task and status - done
  console.log(task);
  res.status(200).json({
    status: "success",
    results: task.length,
    tasks: task,
  });
});

//EOD Email Notification

const EODTodoMail = async () => {
  const todoList = await Task.find({ day: "Monday" });
  let EODMessage = "";
  let userId;
  todoList.forEach(async (list) => {
    EODMessage =
      EODMessage +
      "\n" +
      `To-Do User's Task ${list.user} : ${list.task} is in the status of "${list.status}"`;
    userId = await User.find({ _id: list.user });
    userId.forEach((list) => {
      EmailNotification({
        message: EODMessage,
        email: list.email,
      });
    });
  });
};

exports.cronTask = cron.schedule("  * */10 * * * ", () => {
  EODTodoMail();
});
