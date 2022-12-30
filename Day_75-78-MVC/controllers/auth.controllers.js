const validationSession = require("../util/validation-session");
const validation = require("../util/validation");

const Auth = require("../models/auth.model");

const getSignup = (req, res) => {
  const sessionErrorData = validationSession.getSessionErrorData(req, {
    email: "",
    confirmEmail: "",
    password: "",
  });

  res.render("signup", {
    inputData: sessionErrorData,
  });
};

const getLogin = (req, res) => {
  const sessionErrorData = validationSession.getSessionErrorData(req, {
    email: "",
    password: "",
  });

  res.render("login", {
    inputData: sessionErrorData,
  });
};

const signup = async (req, res) => {
  const userData = req.body;
  const enteredEmail = userData.email;
  const enteredConfirmEmail = userData["confirm-email"];
  const enteredPassword = userData.password;

  if (
    !validation.signupDataIsValid(
      enteredEmail,
      enteredConfirmEmail,
      enteredPassword
    )
  ) {
    validationSession.flashSessionErrors(
      req,
      {
        message: "Invalid input - please check your data.",
        email: enteredEmail,
        confirmEmail: enteredConfirmEmail,
        password: enteredPassword,
      },
      () => {
        res.redirect("/signup");
      }
    );

    return;
  }

  const newUser = new Auth(enteredEmail, enteredPassword);
  const userAlreadyExists = await newUser.alreadyExists()

  if (userAlreadyExists) {
    validationSession.flashSessionErrors(
      req,
      {
        message: "User exists already!",
        email: enteredEmail,
        confirmEmail: enteredConfirmEmail,
        password: enteredPassword,
      },
      () => {
        res.redirect("/signup");
      }
    );

    return;
  }

  await newUser.save();

  res.redirect("/login");
};

const login = async (req, res) => {
  const userData = req.body;
  const enteredEmail = userData.email;
  const enteredPassword = userData.password;

  const user = new Auth(enteredEmail, enteredPassword);

  const existingUser = await user.getUser();

  if (!existingUser) {
    validationSession.flashSessionErrors(
      req,
      {
        message: "Could not log you in - please check your credentials!",
        email: enteredEmail,
        password: enteredPassword,
      },
      () => {
        res.redirect("/login");
      }
    );

    return;
  }


  const passwordAreEqual = await validation.passwordsAreEqual(
    enteredPassword,
    existingUser.password
  );

  if (!passwordAreEqual) {
    validationSession.flashSessionErrors(
      req,
      {
        message: "Could not log you in - please check your credentials!",
        email: enteredEmail,
        password: enteredPassword,
      },
      () => {
        res.redirect("/login");
      }
    );

    return;
  }

  req.session.user = { id: existingUser._id, email: existingUser.email };
  req.session.isAuthenticated = true;
  req.session.save(function () {
    res.redirect("/admin");
  });
};

const logout = (req, res) => {
  req.session.user = null;
  req.session.isAuthenticated = false;
  res.redirect("/");
};

const get401 = (req, res) => {
  res.status(401).render("401");
}

module.exports = {
  getSignup,
  getLogin,
  signup,
  login,
  logout,
  get401
};
