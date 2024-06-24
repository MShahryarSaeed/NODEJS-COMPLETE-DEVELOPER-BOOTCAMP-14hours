require("express-async-errors");
require("dotenv").config();
const fs=require("fs");
const express = require("express");
const cookieParser = require("cookie-parser");
const postRoutes = require("./routes/post.routes");
const commentRoutes = require("./routes/comment.routes");
const errorHandler = require("./handlers/errorHandler");
const userRoutes = require("./routes/user.routes");
const NotFoundError = require("./common/errors/NotFoundError");
const verifyUser = require("./middlewares/verifyUser");
const ebookRoutes = require("./routes/ebook.routes");
const helmet=require("helmet");
const compression=require("compression");
const morgan=require("morgan");

const app = express();
// Middlewares
app.use(helmet());
app.use(compression());
const accessLogStream=fs.createWriteStream(__dirname+'/access.log',{flags:'a'});
app.use(morgan('combined',{stream:accessLogStream}));
app.use(express.json());
app.use(cookieParser())
app.use((req, res, next) => {

    console.log(`Incomming ${req.method} to URL : ${req.url}`);

    next();
});

// To make our upload folder accessbile 
app.use('/uploads', verifyUser, express.static('uploads'));




// Models
require("./models/post.model");
require("./models/comment.model");
require("./models/user.model");

// Routes
app.use("/api/auth", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/ebooks", ebookRoutes);

app.all("*", (req, res, next) => {
    next(new NotFoundError()); // Pass the error to the error-handling middleware(errorHandler)
})

// errorHandler
app.use(errorHandler);




// res.cookie('accessToken', accessToken, { httpOnly: true, secure: true, sameSite: 'strict' })

module.exports = app;

