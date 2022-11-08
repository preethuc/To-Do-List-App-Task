import User from "../models/userModel";
import mail from "../utils/mail";
import jwt from "jsonwebtoken";
import catchAsync from "./../utils/catchAsync";
import AppError from "./../utils/AppError";

// POST - Register
exports.register = catchAsync(async (req, res, next) => {
  let otpForEmail = parseInt(Math.random() * 1000000);
  const newUser = await User.create(req.body);
  if (!newUser) {
    return next(new AppError("failed to register", 404));
  }
  newUser.otp = otpForEmail;
  newUser.save();
  console.log(otpForEmail);

  const message = `Your verification code for To-Do application is ${otpForEmail}.`;
  console.log(message);
  await mail({
    email: req.body.email,
    subject: "Email Verification for To-Do ",
    message,
  });

  res.status(201).json({
    status: "success",
    message: "User - Created",
    data: {
      user: newUser,
    },
  });
});

// POST - login
exports.login = catchAsync(async (req, res, next) => {
  const { email, otp } = req.body;
  const user = await User.findOne({ email }).select("+otp");
  if (!user) {
    return next(new AppError("unable to login", 404));
  }
  if (otp != user.otp) {
    return res.status(404).json({
      status: "fail",
      message: "not a match",
    });
  }
  const payload = {
    email: user.email,
    id: user.id,
  };
  const token = jwt.sign(payload, "To-Do-Secret", { expiresIn: "50d" });
  return res.status(201).json({
    status: "success",
    message: "successfully logged IN",
    user,
    token: "Bearer " + token,
  });
});

//GET - All User
exports.getAllUser = catchAsync(async (req, res, next) => {
  const user = await User.find();
  if (!user) {
    return next(new AppError("failed to get all the user", 404));
  }
  return res.status(200).json({
    status: "success",
    result: user.length,
    message: "All Users",
    users: user,
  });
});

//GET - User by Id
exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new AppError("failed to get single user", 404));
  }
  return res.status(200).json({
    status: "success",
    message: "User By Id",
    updatedUser: user,
  });
});

//UPDATE - User by Id
exports.updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!user) {
    return next(new AppError("failed to update the user", 404));
  }
  return res.status(200).json({
    status: "success",
    updatedUser: user,
  });
});

//DELETE - User by Id
exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    return next(new AppError("failed to delete the user", 404));
  }
  return res.status(204).json({
    status: "success",
    user,
  });
});
