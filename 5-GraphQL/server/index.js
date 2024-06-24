require("express-async-errors");
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const jsonwebtoken = require("jsonwebtoken");
const errorHandler = require("./handlers/errorHandler");
const { graphqlHTTP } = require('express-graphql');
// GraphQL
const schema = require("./GraphQL/schema");
const resolvers = require("./GraphQL/resolver");

const app = express();

// Middlewares
app.use(express.json()); // To parse JSON Body

// Connection
mongoose.connect(process.env.MONGO_URI, {})
  .then(() => console.log(`Connected to MongoDB Database Successfully`))
  .catch(error => console.log(`Error While connecting to Database`, error));

// Routes
app.all("/graphql", graphqlHTTP((req, res, params) => {
  let payload;

  // Check if the query includes "authenticate" or if there is no operationName
  const isAuthenticateQuery = params?.query?.includes("autenticate") || !params.operationName;

  if (!isAuthenticateQuery) { // means we are not creating a new account
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      throw new Error("unauthorized");
    }

    try {
      payload = jsonwebtoken.verify(token, process.env.JWT_SECRET || "JWT_SECRET");
      if (!payload) throw new Error();
    } catch (err) {
      throw new Error("unauthorized");
    }
  }

  return {
    schema,
    rootValue: resolvers,
    context: {
      req,
      payload,
    },
    graphiql: true,
  };
}));

// Error handler middleware
app.use(errorHandler);

// Server initialization
app.listen(process.env.PORT, () => console.log(`Server is Listening on http://localhost:${process.env.PORT}`));
