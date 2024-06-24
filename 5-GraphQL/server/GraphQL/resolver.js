const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
const factModel = require("../models/fact.model");
const userModel = require("../models/user.model");
const voteModel = require("../models/vote.model");
const validator = require("validator");
const mongoose = require("mongoose");

// Error generator function
const generatGraphQLError = (message, extensions) => {
    throw new GraphQLError(message, null, null, null, null, null, extensions);
};

module.exports = {
    hello: () => "Hello World",

    autenticate: async ({ email, password }, req) => {
        const errors = [];

        if (!validator.isEmail(email)) {
            errors.push("Please Enter a Valid Email Address");
        }

        if (errors.length > 0) {
            generatGraphQLError("Invalid Data", {
                errors,
                code: "INVALID_DATA",
            });
        }

        try {
            const user = new userModel({ email, password });
            await user.save();

            return {
                jwt: jwt.sign({ email: user.email, _id: user._id }, process.env.JWT_SECRET || "JWT_SECRET", {
                    expiresIn: "30d",
                }),
            };
        } catch (error) {
            generatGraphQLError("Something went Wrong", {
                errors,
                code: "INTERNAL_SERVER_ERRORS",
            });
        }
    },

    createFact: async ({ content, category }, context) => {
        const errors = [];

        if (validator.isEmpty(content.trim())) {
            errors.push({ message: "Content should not be Empty", statusCode: 400 });
        }

        if (errors.length > 0) {
            generatGraphQLError("Invalid Data", {
                errors,
                code: "INVALID_DATA",
            });
        }

        try {
            const newFact = new factModel({
                user: context.payload._id,
                content,
                category
            });

            await newFact.save();

            return newFact;
        } catch (error) {
            generatGraphQLError("Something went Wrong", {
                errors,
                code: "INTERNAL_SERVER_ERROR",
            });
        }
    },

    vote: async ({ factId, isUpVote }, context) => {

        console.log("Data :", factId, isUpVote);
        if (!factId) {
            generatGraphQLError("Invalid Document ID", { code: "INVALID_DATA" });
        }

        if (!context.payload || !context.payload._id) {
            generatGraphQLError("Unauthorized", { code: "UNAUTHORIZED" });
        }

        try {
            const vote = new voteModel({
                user: context.payload._id,
                fact: factId,
                isUpVote: isUpVote
            });

            await vote.save();

            const update = isUpVote
                ? { $push: { upVotes: vote._id }, $inc: { upvoteCount: 1 } }
                : { $push: { downVotes: vote._id }, $inc: { downvoteCount: 1 } };

            const fact = await factModel.findByIdAndUpdate(factId, update, { new: true })
                .populate("downVotes")
                .populate("upVotes");

            if (!fact) {
                generatGraphQLError("Fact not found", { code: "NOT_FOUND" });
            }

            return fact;
        } catch (err) {
            generatGraphQLError("Something went wrong while voting", {
                code: "INTERNAL_SERVER_ERROR",
            });
        }
    },

    getFacts: async (args, context) => {

        try {
            const facts = await factModel.find({})
                .populate("upVotes")
                .populate("downVotes")
                .sort({
                    upvoteCount: -1,
                    downvoteCount: 1,
                });

            return facts;
        } catch (err) {
            generatGraphQLError("something went wrong", {
                code: "INTERNAL_SERVER_ERROR",
            });
        }

    },

    getFactsByCategory: async ({ category }, context) => {
        try {
            return await factModel.find({ category });
        } catch (err) {
            generatGraphQLError("something went wrong", {
                code: "INTERNAL_SERVER_ERROR",
            });
        }
    },

    deleteFact: async ({ factId }, context) => {

        console.log(factId);

        try {

            const fact = await factModel.findById(factId);

            if (!fact)
                return generatGraphQLError("Document not found", {
                    code: "NOT_FOUND_ERROR",
                });

            const { deletedCount } = await factModel.deleteOne({
                _id: factId,
                user: context.payload._id,
            });

            if (deletedCount === 0) {
                return generatGraphQLError("not authorized", { code: "UNAUTHORIZED" });
            }

            const votesIds = [...fact.upVotes, ...fact.downVotes];

            await voteModel.deleteMany({ _id: { $in: votesIds } });

            return true;
        } catch (err) {
            generatGraphQLError("something went wrong", {
                code: "INTERNAL_SERVER_ERROR",
            });
        }
    },


};
