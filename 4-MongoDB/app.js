require("express-async-errors"); // Automatically handles async errors in routes
require("dotenv").config(); // Loads environment variables from a .env file
const fs = require("fs");
const express = require("express");
const cookieParser = require("cookie-parser");
const postRoutes = require("./routes/post.routes"); // Routes for posts
const commentRoutes = require("./routes/comment.routes"); // Routes for comments
const errorHandler = require("./handlers/errorHandler"); // Global error handler
const userRoutes = require("./routes/user.routes"); // Routes for user authentication
const NotFoundError = require("./common/errors/NotFoundError"); // Custom 404 error
const verifyUser = require("./middlewares/verifyUser"); // Middleware to verify user authentication
const ebookRoutes = require("./routes/ebook.routes"); // Routes for ebooks
const helmet = require("helmet"); // Adds security headers to HTTP responses
const compression = require("compression"); // Compresses responses to improve performance
const morgan = require("morgan"); // Logs incoming requests

const app = express();

// Apply security headers
app.use(helmet());
// Apply response compression
app.use(compression());

// Log requests to access.log
const accessLogStream = fs.createWriteStream(__dirname + '/access.log', { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));

// Parse incoming JSON requests
app.use(express.json());

// Parse cookies from incoming requests
app.use(cookieParser());

// Log each incoming request method and URL
app.use((req, res, next) => {
    console.log(`Incoming ${req.method} to URL: ${req.url}`);
    next();
});

// Make the 'uploads' directory accessible and verify the user
app.use('/uploads', verifyUser, express.static('uploads'));

// Import models
require("./models/post.model");
require("./models/comment.model");
require("./models/user.model");

// Define API routes
app.use("/api/auth", userRoutes); // User authentication routes
app.use("/api/posts", postRoutes); // Post routes
app.use("/api/comments", commentRoutes); // Comment routes
app.use("/api/ebooks", ebookRoutes); // Ebook routes

// Handle undefined routes (404 error)
app.all("*", (req, res, next) => {
    next(new NotFoundError()); // Trigger the errorHandler with a 404 error
});

// Global error handler middleware
app.use(errorHandler);

module.exports = app;
