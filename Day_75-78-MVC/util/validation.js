const bcrypt = require("bcryptjs");

const postIsValid = (title, content) => {
  return title && content && title.trim() !== "" && content.trim() !== "";
};

const signupDataIsValid = (email, confirmEmail, password) => {
  return (
    email &&
    confirmEmail &&
    password &&
    password.trim().length > 6 &&
    email === confirmEmail &&
    email.includes("@")
  );
};

const passwordsAreEqual = async (password, comparedPassword) => {
  return await bcrypt.compare(password, comparedPassword);
};

module.exports = {
  postIsValid,
  signupDataIsValid,
  passwordsAreEqual,
};
