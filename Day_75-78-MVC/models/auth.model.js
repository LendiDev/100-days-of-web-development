const db = require("../data/database");
const bcrypt = require("bcryptjs");

class Auth {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }

  getUser = async () => {
    const user = await db
      .getDb()
      .collection("users")
      .findOne({ email: this.email });
    return user;
  };

  alreadyExists = async () => {
    const existingUser = await this.getUser();
    return existingUser ? true : false;
  };

  save = async () => {
    const hashedPassword = await bcrypt.hash(this.password, 12);

    const result = await db
      .getDb()
      .collection("users")
      .insertOne({
        email: this.email,
        password: hashedPassword,
      });

      return result;
  };

}

module.exports = Auth;
