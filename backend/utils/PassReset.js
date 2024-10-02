const nodemailer = require("nodemailer");

const SendResetMail = (options) => {
  const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const mailOptions = {
    from: "Backend password reset",
    to: options.to,
    subject: options.subject,
    text: options.text,
  };

  return transport.sendMail(mailOptions);
};

module.exports = SendResetMail;
