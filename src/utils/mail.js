import nodemailer from "nodemailer";

const mail = async (options) => {
  console.log(options.email);
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
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};
module.exports = mail;
