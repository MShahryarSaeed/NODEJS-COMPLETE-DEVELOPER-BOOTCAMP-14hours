const express = require("express");
const { SignUp, SignIn, Signout, currentUser } = require("../controllers/userCtrl");
const { check } = require("express-validator");
const userModel = require("../models/user.model");
const verifyUser = require("../middlewares/verifyUser");

const userRoutes = express.Router();

const validators = [

    check('email')
        .not()
        .isEmpty()
        .withMessage('email field is required')
        .isEmail()
        .withMessage('Invalid Email')
        .custom(async (value) => {
            const user = await userModel.findOne({ email: value });
            if (user) {
                throw new Error('Email is already in use');
            }
            return true;
        })
        .custom((value) => {
            if (value === 'test@gmail.com') {
                throw new Error('This Email is not Allowed');
            }
            return true;
        }),

    check('password')
        .not()
        .isEmpty()
        .withMessage('password field is required')
        .isLength({ min: 6, max: 15 })
        .withMessage('Password must be at least 6 to 15 characters long')
        .not()
        .isAlphanumeric()
        .withMessage('The password must be alphanumeric (consisting of both letters and numbers)'),

    check('username')
        .not()
        .isEmpty()
        .withMessage('Username field is required')
        .isLength({ min: 6, max: 15 })
        .withMessage('Username must be at least 6 to 15 characters long')
        .custom(async (value) => {
            const user = await userModel.findOne({ username: value.toLowerCase() });
            if (user) {
                throw new Error('Username is already in use');
            }
            return true;
        })
        .custom((value) => {
            if (value !== value.toLowerCase()) {
                throw new Error('Username must be lowercase');
            }
            return true;
        })
];

userRoutes.post("/signup", validators, SignUp);
userRoutes.post("/signin", SignIn);
userRoutes.get('/currentUser',verifyUser,currentUser)
userRoutes.post("/signout", Signout);

module.exports = userRoutes;