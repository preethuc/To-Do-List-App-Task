import nodemailer from "nodemailer";

const EmailNotification = async (options) => {
  console.log("inside the mail");

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "chelladuraipreetha@gmail.com",
      pass: "epbz yhmh jnbs gmbr",
    },
  });

  const mailOptions = {
    from: "chelladuraipreetha@gmail.com",
    to: options.email,
    subject: "EOD Status",
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};
module.exports = EmailNotification;
