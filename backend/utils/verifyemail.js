const nodemailer = require("nodemailer");

const VerifyEmail = (options) => {
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
    from: "Backend App",
    to: options.to,
    subject: options.subject,
    html: options.html,
  };

  return transport.sendMail(mailOptions);
};

module.exports = VerifyEmail;
