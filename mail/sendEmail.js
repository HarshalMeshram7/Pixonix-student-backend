const ejs = require("ejs");
const path = require("path");
const transporter = require("./transporter");

const sendUserCreationEmail = async ({ application_no, password, email }) => {
  const requiredPath = path.join(__dirname, "../views/index.ejs");

  const data = await ejs.renderFile(requiredPath, {
    application_no: application_no,
    password: password,
  });

  const mainOptions = {
    from: `"admin" ${process.env.SENDER_EMAIL}`,
    to: email,
    subject: "Application Credentials",
    html: data,
  };

  await transporter.sendMail(mainOptions);
};
module.exports = sendUserCreationEmail;
