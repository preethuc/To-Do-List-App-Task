"use strict";

var _userModel = require("./../model/userModel");

var _userModel2 = _interopRequireDefault(_userModel);

var _mail = require("./../utils/mail");

var _mail2 = _interopRequireDefault(_mail);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// POST - Register
exports.register = async function (req, res, next) {
  var newUser = await _userModel2.default.create(req.body);
  var otpForEmail = parseInt(Math.random() * 1000000);
  console.log(otpForEmail);
  await _userModel2.default.create({
    email: req.body.email,
    otp: otpForEmail
  });

  var message = "Your verification code for To-Do application is " + otpForEmail + ".";
  console.log(message);
  try {
    await (0, _mail2.default)({
      email: req.body.email,
      subject: "Email Verification for To-Do ",
      message: message
    });

    res.status(201).json({
      status: "success",
      message: "User - Created",
      data: {
        user: newUser
      }
    });
  } catch (err) {
    console.log(err);
    return res.send(err);
  }
};