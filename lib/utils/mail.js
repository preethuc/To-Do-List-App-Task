"use strict";

var _nodemailer = require("nodemailer");

var _nodemailer2 = _interopRequireDefault(_nodemailer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.mail = async function (options) {
  console.log(options.email);
  var transporter = _nodemailer2.default.createTransport({
    service: "gmail",
    auth: {
      user: "chelladuraipreetha@gmail.com",
      pass: "epbz yhmh jnbs gmbr"
    }
  });

  var mailOptions = {
    from: "chelladuraipreetha@gmail.com",
    to: options.email,
    subject: options.subject,
    text: options.message
  };

  await transporter.mail(mailOptions);
};