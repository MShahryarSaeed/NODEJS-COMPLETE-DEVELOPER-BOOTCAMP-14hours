//imports
const { validationResult } = require("express-validator");
const fs = require("fs");
const path = require("path");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const jsonwebtoken = require("jsonwebtoken");
// Models
const EbookModel = require("../models/ebook.model");
const userModel = require("../models/user.model");
// Errors Classes
const NotAuthorizedError = require("../common/errors/NotAuthorizedError");
const BadRequest = require("../common/errors/BadRequestError");
const NotFoundError = require("../common/errors/NotFoundError");
const RequestValidationError = require("../common/errors/RequestValidationErrors");


/**
 * @type {import ('stripe').Stripe }
 */

// create Ebook Controller
const createEbook = async (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        return next(new RequestValidationError(errors.array())); // Corrected error handling

    }


    const { title, description, price } = req.body;

    if (!req.file) {

        throw new BadRequest("A PDF File is Required to create a new Ebook!")
    }

    const { filename } = req.file;

    const newEbook = await EbookModel.create({
        userId: req.user._id,
        title: title,
        description: description,
        price: price,
        filename: filename
    });

    // Save Book to users ebooks array
    const user = await userModel.findById(req.user._id);

    if (!user) throw new NotFoundError("User Not Found,User is Required to craete a new Ebook");

    user.ebooks.push(newEbook?._id); //push the Id of newly created book in users ebooks array

    await user.save();

    res.status(201).json({

        status: "Success",
        message: "Ebook Created Successfully",
        Ebook: newEbook

    })

}

// update Ebook Controller
const updateEbook = async (req, res, next) => {

    const { ebookId } = req.params;
    const { title, description, price } = req.body;


    const ebook = await EbookModel.findById(ebookId);

    if (!ebook) throw new NotFoundError("Can't uble to update as Ebook Not Found");

    let filename = ebook.filename;

    if (req.file) {

        const oldFilePath = path.join('private', 'ebooks', filename);

        fs.unlink(oldFilePath, (error) => {

            if (error) {
                return next(new BadRequest('File Not Deleted'));
            }

        });

        filename = req.file.filename; //new filename varibale contain the new filename which user upadted by requesting 
    }


    const updatedEbook = await EbookModel.findOneAndUpdate(
        { _id: ebookId },
        {
            $set: {
                title: title,
                description: description,
                price: price,
                filename: filename
            }
        },
        {
            new: true,
            runValidators: true
        }
    );

    if (!updatedEbook) throw new NotFoundError("Ebook Not Found");

    res.status(200).json({

        status: "Success",
        message: "Ebook Updated Successfully",
        Ebook: updatedEbook

    })


}

// GetALLEbooks
const allEbooks = async (req, res) => {

    const ebooks = await EbookModel.find({}); //Get All Ebooks

    if (!ebooks) throw new NotFoundError("Failed to Get All Ebooks as No Books Found");


    res.status(200).json({

        status: "Success",
        message: "All Books",
        AllEbooks: ebooks

    });
}


// Get Single Ebook
const GetSingleEbook = async (req, res, next) => {

    const { ebookId } = req.params;

    const ebook = await EbookModel.findById(ebookId);

    if (!ebook) throw new NotFoundError("Failed to Get Ebook as Requesting EBook Not Found ");


    res.status(200).json({

        status: "Success",
        message: "Single Book",
        Ebook: ebook

    });
}

// Delete Ebook
const DeleteEbook = async (req, res, next) => {

    const { ebookId } = req.params;

    const ebook = await EbookModel.findById(ebookId);

    if (!ebook) throw new NotFoundError("No Book Found");

    const oldFilePath = path.join('private', 'ebooks', ebook.filename);

    fs.unlink(oldFilePath, (error) => {

        if (error) {
            return next(new BadRequest('File Not Deleted'));
        }

    });


    const deletedEbook = await EbookModel.findByIdAndDelete(ebookId);

    if (!deletedEbook) throw new NotFoundError("No Book Found");

    // Remove the _id of deleted Ebook from users ebooks array
    await userModel.findOneAndDelete(
        { _id: req.user._id },
        {
            $pull: { ebooks: deletedEbook?._id }
        },
        {
            new: true,
            runValidators: true
        }
    )

    res.status(200).json({

        status: "Success",
        message: "Ebook Deleted Successfully",
        DeletedEbook: deletedEbook

    });
}

const purchaseEbook = async (req, res, next) => {

    try {

        const { stripeToken } = req.body; //we get this token by making POST Request to https://api.stripe.com/v1/tokens with card information

        const ebook = await EbookModel.findById(req.params.ebookId);

        if (!ebook) throw new BadRequest("Ebook Document Not Found");

        const charge = await stripe.charges.create({
            amount: ebook.price * 100,
            currency: "usd",
            description: "One-Time-Payment",
            source: stripeToken
        });

        if (charge.status === "failed") {
            throw new BadRequest("Payment has failed!");
        }


        const accessToken = jsonwebtoken.sign(
            { ebookId: ebook._id, userId: req.user._id },
            process.env.SECRET,
            { expiresIn: "1d" }
        );

        const download_url = `http://localhost:3000/api/ebooks/download/${accessToken}`;

        res.status(200).json({


            status: "Success",
            message: "Ebook Purchased Successfully",
            download_url: download_url
        })


    } catch (error) {
        next(error);
    }

}

const DownloadEbook = async (req, res, next) => {


    const { accessToken } = req.params;

    try {

        const decodedToken = jsonwebtoken.verify(accessToken, process.env.SECRET);

        if (!decodedToken || decodedToken.userId !== req.user._id) {
            throw new NotAuthorizedError();
        }

        const ebook = await EbookModel.findById(decodedToken.ebookId);

        const filepath = path.join('private', 'ebooks', ebook.filename);

        // Stream ebook to client
        const stream = fs.createReadStream(filepath);
        stream.on('open', () => {
            res.setHeader('Content-Type', 'application/pdf');
            stream.pipe(res)
        });

        stream.on('error', (err) => {
            throw err
        })

    } catch (error) {
        next(error);
    }
}


module.exports = { createEbook, updateEbook, allEbooks, GetSingleEbook, DeleteEbook, purchaseEbook, DownloadEbook };