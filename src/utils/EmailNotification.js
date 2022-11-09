import nodemailer from "nodemailer";

const EmailNotification = async (options) => {
  
  // const arrTostr = (options.message).join()
  // console.log(arrTostr);
  // console.log(options.email);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "chelladuraipreetha@gmail.com",
      pass: "epbz yhmh jnbs gmbr",
    },
  });

  const task = options.task
  const status = options.status
  const message = `
  task "${task}" is in the status of "${status}"`

  const mailOptions = {
    from: "chelladuraipreetha@gmail.com",
    to: "chelladuraipreetha@gmail.com",
    subject: "EOD Status",
    text: message
  };

  await transporter.sendMail(mailOptions);
};
module.exports = EmailNotification;
