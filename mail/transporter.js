const nodemailer = require("nodemailer");

/***** E-mail configuration setting */
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: process.env.SENDER_EMAIL,
    pass: "mkipplkfsecvskuk",
  },
});

/***** connection checkup */
transporter.verify((error, success) => {
  if (error) {
    console.log("Mail server error");
  } else {
    console.log("Mail server running...!!!");
  }
});

module.exports = transporter;
