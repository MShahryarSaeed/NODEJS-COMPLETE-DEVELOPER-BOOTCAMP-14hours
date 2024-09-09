const userModel = require("../models/user.model");
const jwtManager = require("../managers/jwtManager");
const { validationResult } = require("express-validator");
const bcryptjs = require("bcrypt");
const RequestValidationError = require("../common/errors/RequestValidationErrors");
const NotFoundError = require("../common/errors/NotFoundError");
const BadRequestError = require("../common/errors/BadRequestError");

// SignUp Controller
const SignUp = async (req, res, next) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new RequestValidationError(errors.array()));
  }

  const { username, email, password } = req.body;

  const hashedPassword = await bcryptjs.hash(password, 10);

  const newUser = await userModel.create({
    username: username,
    email: email,
    password: hashedPassword,
  });

  if (!newUser) throw new NotFoundError("User Not Created Yet!");

  const { password: pass, ...rest } = newUser._doc;

  res.status(201).json({
    status: "Success",
    message: "User Registered Successfully",
    user: rest,
  });
};

//SignIn Controller
const SignIn = async (req, res, next) => {
  
  const { email, password } = req.body;

  if (!email) throw new BadRequestError("Email is Required");
  if (!password) throw new BadRequestError("Password is Required");

  const getUser = await userModel.findOne({ email: email });

  if (!getUser) throw new NotFoundError("User Not Found!");

  const comparePassword = await bcryptjs.compare(password, getUser.password);

  if (!comparePassword) throw new BadRequestError("Wrong Password");

  const { password: pass, ...rest } = getUser._doc;

  const accessToken = jwtManager(getUser);

  res.cookie("accessToken", accessToken, { httpOnly: true }).status(200).json({
    status: "Success",
    message: "User Logged In Successfully",
    user: rest,
  });
};

// Current User
const currentUser = async (req, res) => {

  const user = await userModel.findById(req.user._id);
  if (!user) throw new NotFoundError("User Not Found");

  const { password, ...rest } = user._doc;

  res.status(200).json({
    status: "Success",
    currentUser: rest,
  });

};

// SignOut Conytroller
const Signout = (req, res) => {

  try {

    res.clearCookie("accessToken").status(200).json({
      status: "Success",
      message: "User Logged Out Successfully",
    });

  } catch (error) {

    res.status(500).json({
      status: "Internal Server Error",
      error: error,
    });
    
  }
};

module.exports = { SignUp, SignIn, currentUser, Signout };
